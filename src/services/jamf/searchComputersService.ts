/* eslint-disable no-useless-escape */
import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, Computer } from "./types";

type Params = {
  q?: string;
  email?: string;
  ids?: Array<Computer["id"]>;
};

const searchComputersService = (
  client: IDeskproClient,
  { q, ids, email }: Params,
) => {
  let filterQuery: string[] = [];

  if (q) {
    filterQuery = [
      ...filterQuery,
      `general.name==\"${q}\"`,
      `hardware.macAddress==\"${q}\"`,
      `hardware.serialNumber==\"${q}\"`,
    ];
  }

  if (ids) {
    filterQuery = [...filterQuery, ...ids.map((id) => `id==\"${id}\"`)];
  }

  if (email) {
    filterQuery = [...filterQuery, `userAndLocation.email==\"${email}\"`];
  }

  return baseRequest<Pagination<Computer>>(client, {
    url: `/v1/computers-inventory`,
    queryParams: [
      "section=GENERAL",
      "section=OPERATING_SYSTEM",
      "section=HARDWARE",
      "section=STORAGE",
      "page-size=100",
      "sort=general.name:asc",
      `filter=(${filterQuery.join(",")})`,
    ].join("&"),
  });
};

export { searchComputersService };
