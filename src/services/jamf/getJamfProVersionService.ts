import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { JamfProVersion } from "./types";

const getJamfProVersionService = (client: IDeskproClient) => {
  return baseRequest<JamfProVersion>(client, { url: "/v1/jamf-pro-version" });
};

export { getJamfProVersionService };
