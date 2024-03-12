import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useDevice } from "./hooks";
import { Device } from "../../components";
import type { FC } from "react";
import type { DeviceMeta } from "../../types";

const DevicePage: FC = () => {
  const params = useParams();
  const { isLoading, device } = useDevice(params as DeviceMeta);

  useSetTitle("Jamf Pro");

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink device",
        payload: { type: "unlink", device: null },
      }],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Device device={device} />
  );
};

export { DevicePage };
