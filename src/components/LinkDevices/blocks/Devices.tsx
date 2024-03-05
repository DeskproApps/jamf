import { Fragment } from "react";
import { Checkbox } from "@deskpro/deskpro-ui";
import { LoadingSpinner, HorizontalDivider } from "@deskpro/app-sdk";
import { entity } from "../../../utils";
import { NoFoundDevices, Card } from "../../common";
import { DeviceItem } from "../../DeviceItem";
import type { FC } from "react";
import type { Device } from "../../../services/jamf/types";

export type Props = {
  isLoading: boolean;
  devices: Device[];
  selectedDevices: Device[];
  onChangeSelectedDevice: (device: Device) => void;
};

const Devices: FC<Props> = ({
  devices,
  isLoading,
  selectedDevices,
  onChangeSelectedDevice,
}) => {
  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <NoFoundDevices devices={devices}>
      {(devices) => devices.map((device) => (
        <Fragment key={entity.generateId(device)}>
          <Card>
            <Card.Media>
              <Checkbox
                size={12}
                containerStyle={{ marginTop: 4 }}
                onChange={() => onChangeSelectedDevice(device)}
                checked={selectedDevices.some((selectedDevice) => (
                  entity.generateId(device) === entity.generateId(selectedDevice)
                ))}
              />
            </Card.Media>
            <Card.Body>
              <DeviceItem
                device={device}
                onClickTitle={() => onChangeSelectedDevice(device)}
              />
            </Card.Body>
          </Card>
          <HorizontalDivider/>
        </Fragment>
      ))}
    </NoFoundDevices>
  );
};

export { Devices };
