import { useMemo } from "react";
import { get, size, concat } from "lodash";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../services/deskpro";
import {
  searchComputersService,
  searchMobileDevicesService,
} from "../services/jamf";
import { entity, isMac, isMobile } from "../utils";
import { QueryKey } from "../query";
import type { UserContext } from "../types";
import type { Device } from "../services/jamf/types";

type UseLinkedDevices = () => {
  isLoading: boolean;
  devices: Device[];
};

const useLinkedDevices: UseLinkedDevices = () => {
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const linkedIds = useQueryWithClient(
    [QueryKey.LINKED_DEVICES, dpUserId],
    (client) => getEntityListService(client, dpUserId),
    { enabled: Boolean(dpUserId) },
  );

  const computerIds = (Array.isArray(linkedIds.data) ? linkedIds.data : [])
    .filter((meta) => isMac(entity.parseId(meta)))
    .map((meta) => entity.parseId(meta)?.deviceId)
    .filter(Boolean);

  const mobileDeviceIds = (Array.isArray(linkedIds.data) ? linkedIds.data : [])
    .filter((meta) => isMobile(entity.parseId(meta)))
    .map((meta) => entity.parseId(meta)?.deviceId)
    .filter(Boolean);

  const computers = useQueryWithClient(
    [QueryKey.SEARCH_COMPUTER, ...computerIds as string[]],
    (client) => searchComputersService(client, { ids: computerIds }),
    { enabled: size(computerIds) > 0 },
  );

  const mobileDevices = useQueryWithClient(
    [QueryKey.SEARCH_MOBILE, ...mobileDeviceIds as string[]],
    (client) => searchMobileDevicesService(client, { ids: mobileDeviceIds }),
    { enabled: size(mobileDeviceIds) > 0 },
  );

  return {
    isLoading: [
      linkedIds,
      computers,
      mobileDevices,
    ].some(({ isLoading }) => isLoading) && Boolean(dpUserId),
    devices: concat(
      get(computers, ["data", "results"], []) || [],
      get(mobileDevices, ["data", "results"], []) || [],
    ),
  };
};

export { useLinkedDevices };
