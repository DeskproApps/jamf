import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";

const getJamfProVersionService = (client: IDeskproClient) => {
  return baseRequest(client, { url: "/jamf-pro-version" });
};

export { getJamfProVersionService };
