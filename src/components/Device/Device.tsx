import { isMac, isMobile } from "../../utils";
import { Container } from "../common";
import { ComputerDevice, MobileDevice } from "./blocks";
import type { FC } from "react";
import type { DeviceDetails } from "../../services/jamf/types";

export type Props = {
  device: DeviceDetails;
};

const Device: FC<Props> = ({ device }) => {
  return (
    <Container>
      {isMac(device) ? (
        <ComputerDevice device={device} />
      ) : isMobile(device) ? (
        <MobileDevice device={device} />
      ) : null}
    </Container>
  );
};

export { Device };
