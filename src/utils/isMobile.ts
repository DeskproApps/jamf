import { get, toLower } from "lodash";
import type { Maybe, DeviceMeta } from "../types";
import type { Computer, MobileDevice } from "../services/jamf/types";

const isMobile = (device?: Maybe<Computer|MobileDevice|DeviceMeta>): device is MobileDevice => {
  if (!device) {
    return false;
  }

  const deviceType = get(device, ["deviceType"]) || get(device, ["type"]);

  return ["tvos","ios"].includes(toLower(deviceType));
};

export { isMobile };
