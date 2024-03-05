import { isMac, isMobile } from "../../utils";
import { ComputerItem } from "./ComputerItem";
import { MobileDeviceItem } from "./MobileDeviceItem";
import type { FC } from "react";
import type { Device } from "../../services/jamf/types";

export type Props = {
  device: Device;
  onClickTitle?: () => void;
};

const DeviceItem: FC<Props> = ({ device, onClickTitle }) => {
  if (isMac(device)) {
    return <ComputerItem device={device} onClickTitle={onClickTitle}/>
  }

  if (isMobile(device)) {
    return <MobileDeviceItem device={device} onClickTitle={onClickTitle}/>
  }

  return <></>;
};

export { DeviceItem };
