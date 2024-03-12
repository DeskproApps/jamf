import { ENTITY } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { UserData } from "../../types";

const deleteEntityService = (
  client: IDeskproClient,
  userId: UserData["user"]["id"],
  entityId: string,
) => {
  return client
    .getEntityAssociation(ENTITY, userId)
    .delete(entityId);
};

export { deleteEntityService };
