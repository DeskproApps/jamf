import { useCallback } from "react";
import { get } from "lodash";
import { Link, Title, TwoProperties } from "@deskpro/app-sdk";
import { useExternalLinks } from "../../hooks";
import { nbsp } from "../../constants";
import { JamfLogo } from "../common";
import type { FC, MouseEvent } from "react";
import type { Computer } from "../../services/jamf/types";

export type Props = {
  device: Computer;
  onClickTitle?: () => void;
};

const ComputerItem: FC<Props> = ({ device, onClickTitle }) => {
  const { getComputerLink } = useExternalLinks();
  const deviceLink = getComputerLink(device);

  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onClickTitle && onClickTitle();
  }, [onClickTitle]);

  return (
    <>
      <Title
        title={!onClickTitle
          ? get(device, ["general", "name"])
          : (<Link href="#" onClick={onClick}>{get(device, ["general", "name"])}</Link>)
        }
        {...(!deviceLink ? {} : { icon: <JamfLogo/> })}
        {...(!deviceLink ? {} : { link: deviceLink })}
        marginBottom={10}
      />
      <TwoProperties
        leftLabel="Model"
        leftText={get(device, ["hardware", "model"])}
        rightLabel="OS Version"
        rightText={get(device, ["operatingSystem", "version"])}
      />
      <TwoProperties
        leftLabel="Serial Number"
        leftText={get(device, ["hardware", "serialNumber"])}
        rightLabel="Storage capacity"
        rightText={`${Number(((device.storage?.disks?.[0].sizeMegabytes ?? 0) / 1024).toFixed(2))}${nbsp}GB`
        }
      />
    </>
  );
};

export { ComputerItem };
