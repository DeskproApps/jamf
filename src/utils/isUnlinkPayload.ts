import { has } from "lodash";
import type { EventPayload, UnlinkPayload } from "../types";

const isUnlinkPayload = (
  payload: EventPayload,
): payload is UnlinkPayload => {
  return has(payload, ["device"]);
};

export { isUnlinkPayload };
