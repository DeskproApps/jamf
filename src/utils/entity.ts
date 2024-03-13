import { get, isString } from "lodash";
import { isMac } from "./isMac";
import type { Maybe, DeviceMeta, DeviceMetaAsString } from "../types";
import type { Device, DeviceDetails } from "../services/jamf/types";

const getMeta = (device?: Device|DeviceDetails): Maybe<DeviceMeta> => {
  if (!device) {
    return;
  }

  const deviceId = get(device, ["id"]) || get(device, ["mobileDeviceId"]);
  const type = isMac(device)
    ? get(device, ["general", "platform"])
    : get(device, ["deviceType"]) || get(device, ["type"]);

  if (!deviceId || !type) {
    return;
  }

  return { deviceId, type };
};

const generateId = (device?: Device|DeviceDetails): Maybe<DeviceMetaAsString> => {
  const meta = getMeta(device);

  if (!meta) {
    return;
  }

  try {
    return JSON.stringify(meta);
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

const entity = { getMeta, generateId, parseId };

export { entity };
