import { get, toLower } from "lodash";
import type { Computer, MobileDevice } from "../services/jamf/types";

const isMac = (device?: Computer|MobileDevice): device is Computer => {
  if (!device) {
    return false;
  }

  return toLower(get(device, ["general", "platform"])) === "mac";
};

export { isMac };
