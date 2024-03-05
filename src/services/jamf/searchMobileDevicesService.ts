/* eslint-disable no-useless-escape */
import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, MobileDevice } from "./types";

const searchMobileDevicesService = (
  client: IDeskproClient,
  q: string,
) => {
  const searchQuery = `${[
    `displayName==\"${q}\"`,
    `bluetoothMacAddress==\"${q}\"`,
    `wifiMacAddress==\"${q}\"`,
    `serialNumber==\"${q}\"`,
  ].join(",")}`;

  return baseRequest<Pagination<MobileDevice>>(client, {
    url: `/v2/mobile-devices/detail`,
    queryParams: [
      "section=GENERAL",
      "section=HARDWARE",
      "page-size=100",
      "sort=displayName:asc",
      `filter=(${searchQuery})`,
    ].join("&"),
  });
};

export { searchMobileDevicesService };
