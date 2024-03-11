import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useSetTitle,
  useBadgeCount,
  useLinkedDevices,
  useRegisterElements,
} from "../../hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const { isLoading, devices } = useLinkedDevices();

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
    <Home devices={devices}/>
  );
};

export { HomePage };
