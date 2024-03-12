import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { ComputerDetails } from "./types";

const getComputerService = (
  client: IDeskproClient,
  id: ComputerDetails["id"],
) => {
  return baseRequest<ComputerDetails>(client, {
    url: `/v1/computers-inventory-detail/${id}`,
  });
};

export { getComputerService };
