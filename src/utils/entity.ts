import { get, isString } from "lodash";
import { isMac } from "./isMac";
import type { Maybe, DeviceMeta, DeviceMetaAsString } from "../types";
import type { Computer, MobileDevice } from "../services/jamf/types";

const generateId = (device?: Computer|MobileDevice): Maybe<DeviceMetaAsString> => {
  if (!device) {
    return;
  }

  const deviceId = isMac(device) ? get(device, ["id"]) : get(device, ["mobileDeviceId"]);
  const type = isMac(device)
    ? get(device, ["general", "platform"])
    : get(device, ["deviceType"]);

  if (!deviceId || !type) {
    return;
  }

  try {
    return JSON.stringify({ deviceId, type });
  } catch (e) {
    return;
  }
};

const parseId = (meta?: DeviceMetaAsString): Maybe<DeviceMeta> => {
  if (!meta || !isString(meta)) {
    return;
  }

  try {
    return JSON.parse(meta);
  } catch (e) {
    return;
  }
};

const entity = { generateId, parseId };

export { entity };
