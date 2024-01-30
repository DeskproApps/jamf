import { useSetTitle, useRegisterElements } from "../../hooks";
import { useLogin } from "./hooks";
import { Login } from "../../components";
import type { FC } from "react";

const LoginPage: FC = () => {
  const { isLoading, onLogin } = useLogin();

  useSetTitle("Jamf Pro");

  useRegisterElements();

  return (
    <Login onLogin={onLogin} isLoading={isLoading} />
  );
};

export { LoginPage };
