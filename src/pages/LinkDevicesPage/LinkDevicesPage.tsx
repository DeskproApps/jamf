import { useSetTitle, useRegisterElements } from "../../hooks";
import type { FC } from "react";

const LinkDevicesPage: FC = () => {
  useSetTitle("Link Devices");

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <>
      Link Devices Page
    </>
  );
};

export { LinkDevicesPage };
