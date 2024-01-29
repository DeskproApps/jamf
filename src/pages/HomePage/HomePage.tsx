import { useSetTitle, useRegisterElements } from "../../hooks";
import type { FC } from "react";

const HomePage: FC = () => {
  useSetTitle("Jamf Pro");

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

  return (
    <>
      HomePage
    </>
  );
};

export {HomePage};
