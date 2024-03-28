import { get } from "lodash";
import { baseRequest } from "./baseRequest";
import { getQueryParams } from "../../utils";
import { placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Settings } from "../../types";
import type { AccessToken } from "./types";

const getAccessTokenService = (
  client: IDeskproClient,
  settings?: Settings,
) => {
  const data = new FormData();
  data.append("grant_type", "client_credentials");
  data.append("client_id", get(settings, ["client_id"]) || placeholders.CLIENT_ID);
  data.append("client_secret", get(settings, ["client_secret"]) || placeholders.CLIENT_SECRET);

  return baseRequest<AccessToken>(client, {
    url: `/oauth/token`,
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: getQueryParams(data),
    settings,
  });
};

export { getAccessTokenService };
