import { Search, HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Devices, Buttons } from "./blocks";
import type { FC } from "react";
import type { Device } from "../../services/jamf/types";

export type Props = {
  isLoading: boolean;
  isSubmitting: boolean;
  devices: Device[];
  selectedDevices: Device[];
  onCancel: () => void;
  onLinkDevices: () => void;
  onChangeSearchQuery: (search: string) => void;
  onChangeSelectedDevice: (device: Device) => void;
};

const LinkDevices: FC<Props> = ({
  devices,
  onCancel,
  isLoading,
  isSubmitting,
  onLinkDevices,
  selectedDevices,
  onChangeSearchQuery,
  onChangeSelectedDevice,
}) => {
  return (
    <>
      <Container>
        <Search onChange={onChangeSearchQuery} isFetching={isLoading}/>
        <Buttons
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          selectedDevices={devices}
          onLinkIssues={onLinkDevices}
        />
      </Container>
      <HorizontalDivider/>
      <Container>
        <Devices
          isLoading={isLoading}
          devices={devices}
          selectedDevices={selectedDevices}
          onChangeSelectedDevice={onChangeSelectedDevice}
        />
      </Container>
    </>
  );
};

export { LinkDevices };
