/* eslint-disable no-useless-escape */
import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, MobileDevice, Computer } from "./types";

type Params = {
  q?: string;
  ids?: Array<Computer["id"]>;
};

const searchMobileDevicesService = (
  client: IDeskproClient,
  { q, ids }: Params,
) => {
  let filterQuery: string[] = [];

  if (q) {
    filterQuery = [
      ...filterQuery,
      `displayName==\"${q}\"`,
      `bluetoothMacAddress==\"${q}\"`,
      `wifiMacAddress==\"${q}\"`,
      `serialNumber==\"${q}\"`,
    ];
  }

  if (ids) {
    filterQuery = [...filterQuery, ...ids.map((id) => `mobileDeviceId==\"${id}\"`)];
  }

  return baseRequest<Pagination<MobileDevice>>(client, {
    url: `/v2/mobile-devices/detail`,
    queryParams: [
      "section=GENERAL",
      "section=HARDWARE",
      "page-size=100",
      "sort=displayName:asc",
      `filter=(${filterQuery.join(",")})`,
    ].join("&"),
  });
};

export { searchMobileDevicesService };
