import { useQueryWithClient } from "@deskpro/app-sdk";
import { getComputerService, getMobileDeviceService } from "../../services/jamf";
import { QueryKey } from "../../query";
import { isMac, isMobile } from "../../utils";
import type { DeviceMeta } from "../../types";
import type { DeviceDetails } from "../../services/jamf/types";

export type UseDevice = (meta: DeviceMeta) => {
  isLoading: boolean;
  device: DeviceDetails;
};

const useDevice: UseDevice = (meta) => {
  const key = isMac(meta) ? QueryKey.COMPUTER : QueryKey.MOBILE_DEVICE;
  const getDeviceService = isMac(meta) ? getComputerService : getMobileDeviceService;

  const device = useQueryWithClient(
    [key, meta.deviceId as string],
    (client) => getDeviceService(client, meta.deviceId),
    { enabled: Boolean(isMac(meta) || isMobile(meta)) },
  );

  return {
    isLoading: device.isLoading,
    device: device.data as DeviceDetails,
  };
};

export { useDevice };
