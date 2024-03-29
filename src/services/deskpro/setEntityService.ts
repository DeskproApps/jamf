import { ENTITY } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { UserData } from "../../types";

const setEntityService = (
  client: IDeskproClient,
  userId: UserData["user"]["id"],
  entityId: string,
) => {
  return client
    .getEntityAssociation(ENTITY, userId)
    .set(entityId);
};

export { setEntityService };
