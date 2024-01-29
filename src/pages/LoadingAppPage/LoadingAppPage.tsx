import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useSetTitle("Jamf Pro");

  return (
    <LoadingSpinner/>
  );
};

export { LoadingAppPage };
