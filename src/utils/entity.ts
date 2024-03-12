import { get, isString } from "lodash";
import { isMac } from "./isMac";
import type { Maybe, DeviceMeta, DeviceMetaAsString } from "../types";
import type { Device, Computer, MobileDevice } from "../services/jamf/types";

const getMeta = (device?: Maybe<Device>): Maybe<DeviceMeta> => {
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

  return { deviceId, type };
};

const generateId = (device?: Computer|MobileDevice): Maybe<DeviceMetaAsString> => {
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
