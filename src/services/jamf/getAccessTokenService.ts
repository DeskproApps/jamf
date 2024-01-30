import { baseRequest } from "./baseRequest";
import { getQueryParams } from "../../utils";
import { AUTH_URL, placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { AccessToken } from "./types";

const getAccessTokenService = (client: IDeskproClient) => {
  const data = new FormData();
  data.append("grant_type", "client_credentials");
  data.append("client_id", placeholders.CLIENT_ID);
  data.append("client_secret", placeholders.CLIENT_SECRET);

  return baseRequest<AccessToken>(client, {
    rawUrl: `${AUTH_URL}/token`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: getQueryParams(data),
  });
};

export { getAccessTokenService };
