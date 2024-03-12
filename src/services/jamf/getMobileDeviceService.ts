import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { MobileDevice, MobileDeviceDetails } from "./types";

const getMobileDeviceService = (
  client: IDeskproClient,
  id: MobileDevice["mobileDeviceId"],
) => {
  return baseRequest<MobileDeviceDetails>(client, {
    url: `/v2/mobile-devices/${id}/detail`,
  });
};

export { getMobileDeviceService };
