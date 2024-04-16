import { get } from "lodash";
import { setEntityService, getEntityListService } from "../services/deskpro";
import { searchComputersService, searchMobileDevicesService } from "../services/jamf";
import { entity } from "./entity";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { UserData } from "../types";
import type { Device } from "../services/jamf/types";

const tryToLinkAutomatically = async (
  client: IDeskproClient,
  dpUser?: UserData["user"],
) => {
  try {
    const email = get(dpUser, ["primaryEmail"]) || get(dpUser, ["emails", 0]);
    const dpUserId = get(dpUser, ["id"]);

    if (!email || !dpUserId) {
      return;
    }

    const entityIds = await getEntityListService(client, dpUserId);
    const computers = await searchComputersService(client, { email });
    const mobileDevices = await searchMobileDevicesService(client, { email });

    const devices: Device[] = [
      ...(computers?.results || []),
      ...(mobileDevices?.results || []),
    ];

    return Promise.all([
      ...devices.map((device) => {
        const entityId = entity.generateId(device);
        return (!entityId || entityIds.includes(entityId))
          ? Promise.resolve()
          : setEntityService(client, dpUserId, entityId);
      }),
    ]);
  } catch (e) {
    return;
  }
};

export { tryToLinkAutomatically };
