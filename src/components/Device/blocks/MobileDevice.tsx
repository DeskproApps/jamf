import { get } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { useExternalLinks } from "../../../hooks";
import { nbsp } from "../../../constants";
import { JamfLogo } from "../../common";
import type { FC } from "react";
import type { MobileDeviceDetails } from "../../../services/jamf/types";

export type Props = {
  device: MobileDeviceDetails;
};

const MobileDevice: FC<Props> = ({ device }) => {
  const { getMobileDeviceLink } = useExternalLinks();
  const deviceLink = getMobileDeviceLink(device);

  return (
    <>
      <Title
        title={device.name}
        {...(!deviceLink ? {} : { icon: <JamfLogo/> })}
        {...(!deviceLink ? {} : { link: deviceLink })}
      />
      <Property
        label="User"
        text={
          get(device, ["location", "realName"])
          || get(device, ["location", "username"])
          || get(device, ["location", "emailAddress"])
        }
      />
      <Property
        label="Jamf Pro Mobile Device ID"
        text={get(device, ["id"])}
      />
      <Property
        label="Model"
        text={get(device, ["ios", "model"])}
      />
      <Property
        label="OS Version"
        text={get(device, ["osVersion"])}
      />
      <Property
        label="Serial Number"
        text={get(device, ["serialNumber"])}
      />
      <Property
        label="Storage capacity"
        text={`${Number(((device.ios?.capacityMb ?? 0) / 1024).toFixed(2))
        }${nbsp}GB (${ Number(((device.ios?.availableMb ?? 0) / 1024).toFixed(2))
        } GB${nbsp}free)`}
      />
    </>
  );
};

export { MobileDevice };
