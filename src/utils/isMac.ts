import { get, toLower } from "lodash";
import type { Maybe, DeviceMeta } from "../types";
import type { Computer, MobileDevice } from "../services/jamf/types";

const isMac = (device?: Maybe<Computer|MobileDevice|DeviceMeta>): device is Computer => {
  if (!device) {
    return false;
  }

  const deviceType = get(device, ["general", "platform"]) || get(device, ["type"]);

  return toLower(deviceType) === "mac";
};

export { isMac };
