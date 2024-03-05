/* eslint-disable no-useless-escape */
import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, Computer } from "./types";

const searchComputersService = (
  client: IDeskproClient,
  q: string,
) => {
  const searchQuery = `${[
    `general.name==\"${q}\"`,
    `hardware.macAddress==\"${q}\"`,
    `hardware.serialNumber==\"${q}\"`,
  ].join(",")}`;

  return baseRequest<Pagination<Computer>>(client, {
    url: `/v1/computers-inventory`,
    queryParams: [
      "section=GENERAL",
      "section=OPERATING_SYSTEM",
      "section=HARDWARE",
      "section=STORAGE",
      "page-size=100",
      "sort=general.name:asc",
      `filter=(${searchQuery})`,
    ].join("&"),
  });
};

export { searchComputersService };
