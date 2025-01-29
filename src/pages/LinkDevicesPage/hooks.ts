import { useQueryWithClient } from "@deskpro/app-sdk";
import { searchComputersService, searchMobileDevicesService } from "../../services/jamf";
import { QueryKey } from "../../query";
import type { Device } from "../../services/jamf/types";

type UseSearch = (q: string) => {
  isLoading: boolean;
  devices: Device[];
};

const useSearch: UseSearch = (q) => {
  // Computers (macOS)
  const computers = useQueryWithClient(
    [QueryKey.SEARCH_COMPUTER, q],
    (client) => searchComputersService(client, { q }),
    { enabled: Boolean(q) },
  );

  // Mobile Devices (iOS, tvOS)
  const mobileDevices = useQueryWithClient(
    [QueryKey.SEARCH_MOBILE, q],
    (client) => searchMobileDevicesService(client, { q }),
    { enabled: Boolean(q) },
  );

  return {
    isLoading: [
      computers,
      mobileDevices,
    ].some(({ isLoading }) => isLoading) && Boolean(q),
    devices: [
      ...(computers.data?.results ?? []),
      ...(mobileDevices.data?.results ?? []),
    ].filter(Boolean),
  };
};

export { useSearch };
