import { useCallback } from "react";
import { get, round } from "lodash";
import {Link, Title, TwoProperties} from "@deskpro/app-sdk";
import { nbsp } from "../../constants";
import { useExternalLinks } from "../../hooks";
import { JamfLogo } from "../common";
import type { FC, MouseEvent } from "react";
import type { MobileDevice } from "../../services/jamf/types";

export type Props = {
  device: MobileDevice;
  onClickTitle?: () => void;
};

const MobileDeviceItem: FC<Props> = ({ device, onClickTitle }) => {
  const { getMobileDeviceLink } = useExternalLinks();
  const deviceLink = getMobileDeviceLink(device);

  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onClickTitle && onClickTitle();
  }, [onClickTitle]);

  return (
    <>
      <Title
        title={!onClickTitle
          ? get(device, ["general", "displayName"])
          : (<Link href="#" onClick={onClick}>{get(device, ["general", "displayName"])}</Link>)
        }
        {...(!deviceLink ? {} : { icon: <JamfLogo/> })}
        {...(!deviceLink ? {} : { link: deviceLink })}
        marginBottom={10}
      />
      <TwoProperties
        leftLabel="Model"
        leftText={device.hardware?.model}
        rightLabel="OS Version"
        rightText={device.general?.osVersion}
      />
      <TwoProperties
        leftLabel="Serial Number"
        leftText={device.hardware?.serialNumber}
        rightLabel="Storage capacity"
        rightText={`${round(get(device, ["hardware", "capacityMb"]) / 1024, 2)}${nbsp}GB`}
      />
    </>
  );
};

export { MobileDeviceItem };
