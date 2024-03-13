import { get, round } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { useExternalLinks } from "../../../hooks";
import { nbsp } from "../../../constants";
import { JamfLogo } from "../../common";
import type { FC } from "react";
import type { ComputerDetails } from "../../../services/jamf/types";

export type Props = {
  device: ComputerDetails;
};

const ComputerDevice: FC<Props> = ({ device }) => {
  const { getComputerLink } = useExternalLinks();
  const deviceLink = getComputerLink(device);

  return (
    <>
      <Title
        title={device.general?.name}
        {...(!deviceLink ? {} : { icon: <JamfLogo/> })}
        {...(!deviceLink ? {} : { link: deviceLink })}
      />
      <Property
        label="User"
        text={get(device, ["userAndLocation", "realname"]) || get(device, ["userAndLocation", "username"])}
      />
      <Property
        label="Jamf Pro Computer ID"
        text={get(device, ["id"])}
      />
      <Property
        label="Model"
        text={get(device, ["hardware", "model"])}
      />
      <Property
        label="Serial Number"
        text={get(device, ["hardware", "serialNumber"])}
      />
      <Property
        label="OS Version"
        text={get(device, ["operatingSystem", "version"])}
      />
      <Property
        label="Storage Capacity"
        text={`${
          round(get(device, ["storage", "disks", 0, "sizeMegabytes"]) / 1024, 2)
        }${nbsp}GB (${
          round(get(device, ["storage", "disks", 0, "partitions", 0, "availableMegabytes"]) / 1024, 2)
        } GB${nbsp}free)`}
      />
    </>
  );
};

export { ComputerDevice };
