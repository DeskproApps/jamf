import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";

const invalidateAccessTokenService = (client: IDeskproClient) => {
  return baseRequest(client, {
    url: `/auth/invalidate-token`,
    method: "POST",
  });
};

export { invalidateAccessTokenService };
