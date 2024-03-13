import { useMemo, useCallback } from "react";
import { get } from "lodash";
import { useDeskproLatestAppContext } from "@deskpro/app-sdk";
import type { Maybe, UserContext } from "../types";
import type { Computer, MobileDevice, MobileDeviceDetails } from "../services/jamf/types";

export type Result = {
  getComputerLink: (device?: Maybe<Computer>) => Maybe<string>,
  getMobileDeviceLink: (device?: Maybe<MobileDevice|MobileDeviceDetails>) => Maybe<string>,
};

type UseExternalLinks = () => Result;

const useExternalLinks: UseExternalLinks = () => {
  const { context } = useDeskproLatestAppContext() as { context: UserContext }
  const instanceUrl = useMemo(() => get(context, ["settings", "instance_url"]), [context]);

  const getComputerLink = useCallback((device?: Maybe<Computer>) => {
    return (!instanceUrl || !device?.id)
      ? null
      : `${instanceUrl}/computers.html?id=${device.id}`;
  }, [instanceUrl]);

  const getMobileDeviceLink = useCallback((device?: Maybe<MobileDevice|MobileDeviceDetails>) => {
    const deviceId = get(device, ["mobileDeviceId"]) || get(device, ["id"]);

    return (!instanceUrl || !deviceId)
      ? null
      : `${instanceUrl}/mobileDevices.html?id=${deviceId}`;
  }, [instanceUrl]);

  return { getComputerLink, getMobileDeviceLink };
};

export { useExternalLinks };
