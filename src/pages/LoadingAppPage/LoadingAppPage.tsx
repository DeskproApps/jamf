import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useLoadingApp } from "./hooks";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useLoadingApp();

  useSetTitle("Jamf Pro");

  return (
    <LoadingSpinner/>
  );
};

export { LoadingAppPage };
