import { get, toLower } from "lodash";
import type { Computer, MobileDevice } from "../services/jamf/types";

const isMobile = (device?: Computer|MobileDevice): device is MobileDevice => {
  if (!device) {
    return false;
  }

  return ["tvos","ios"].includes(toLower(get(device, ["deviceType"])));
};

export { isMobile };
