import { Fragment } from "react";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFoundDevices } from "../common";
import { DeviceItem } from "../DeviceItem";
import type { FC } from "react";
import type { Device } from "../../services/jamf/types";

export type Props = {
  devices: Device[];
  onNavigateToDevice: (device: Device) => void;
};

const Home: FC<Props> = ({ devices, onNavigateToDevice }) => {
  return (
    <Container>
      <NoFoundDevices devices={devices}>
        {(devices) => devices.map((device, idx) => (
          <Fragment key={idx}>
            <DeviceItem
              device={device}
              onClickTitle={() => onNavigateToDevice(device)}
            />
            <HorizontalDivider style={{ marginBottom: 8 }} />
          </Fragment>
        ))}
      </NoFoundDevices>
    </Container>
  );
};

export { Home };
