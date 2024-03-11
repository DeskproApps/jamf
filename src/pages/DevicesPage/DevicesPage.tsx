import { useSetTitle, useRegisterElements } from "../../hooks";
import type { FC } from "react";

const DevicesPage: FC = () => {
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

  return (
    <>
      DevicesPage
    </>
  );
};

export { DevicesPage };
