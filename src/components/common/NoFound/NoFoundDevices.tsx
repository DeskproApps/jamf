import size from "lodash/size";
import { NoFound } from "./NoFound";
import type { FC, ReactNode } from "react";
import type { Device } from "../../../services/jamf/types";

export type Props = {
  devices: Device[],
  children?: (devices: Device[]) => ReactNode,
}

const NoFoundDevices: FC<Props> = ({ children, devices }) => (
  <>
    {!Array.isArray(devices)
      ? <NoFound/>
      : !size(devices)
      ? <NoFound text="No devices found"/>
      : children && children(devices)
    }
  </>
);

export { NoFoundDevices };
