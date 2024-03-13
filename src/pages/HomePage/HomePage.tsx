import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useSetTitle,
  useBadgeCount,
  useLinkedDevices,
  useRegisterElements,
} from "../../hooks";
import { entity } from "../../utils";
import { Home } from "../../components";
import type { FC } from "react";
import type { Device } from "../../services/jamf/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { isLoading, devices } = useLinkedDevices();

  const onNavigateToDevice = useCallback((device: Device) => {
    const { deviceId, type } = entity.getMeta(device) || {};

    if (!deviceId || !type) {
      return;
    }

    navigate(`/devices/${deviceId}/${type}`);
  }, [navigate]);

  useSetTitle("Jamf Pro");
  useBadgeCount(devices);

  useRegisterElements(({ registerElement }) => {
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/devices/link" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Log Out",
        payload: {
          type: "logout",
        },
      }],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home devices={devices} onNavigateToDevice={onNavigateToDevice}/>
  );
};

export { HomePage };
