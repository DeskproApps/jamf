import { get, concat } from "lodash";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { searchComputersService, searchMobileDevicesService } from "../../services/jamf";
import type { Device } from "../../services/jamf/types";

type UseSearch = (q: string) => {
  isLoading: boolean;
  devices: Device[];
};

const useSearch: UseSearch = (q) => {
  // Computers (macOS)
  const computers = useQueryWithClient(
    ["search", "computers", q],
    (client) => searchComputersService(client, q),
    { enabled: Boolean(q) },
  );

  // Mobile Devices (iOS, tvOS)
  const mobileDevices = useQueryWithClient(
    ["search", "mobile", q],
    (client) => searchMobileDevicesService(client, q),
    { enabled: Boolean(q) },
  );

  return {
    isLoading: [
      computers,
      mobileDevices,
    ].some(({ isLoading }) => isLoading) && Boolean(q),
    devices: concat(
      get(computers, ["data", "results"]),
      get(mobileDevices, ["data", "results"]),
    ).filter(Boolean),
  };
};

export { useSearch };
