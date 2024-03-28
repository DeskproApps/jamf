import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Settings } from "../../types";
import type { AuthDetails } from "./types";

const getAuthDetailsService = (
  client: IDeskproClient,
  settings: Settings,
  accessToken: string,
) => {
  return baseRequest<AuthDetails>(client, {
    url: "/v1/auth",
    settings,
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });
};

export { getAuthDetailsService };
