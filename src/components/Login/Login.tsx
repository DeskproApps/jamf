import { H3 } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { Button, Container } from "../common";
import type { FC } from "react";

export type Props = {
  onLogin: () => void,
  isLoading: boolean,
};

const Login: FC<Props> = ({ isLoading, onLogin }) => {
  return (
    <Container>
      <Title as={H3} title="Log into your Jamf Pro Account" />
      <Button
        intent="secondary"
        text="Log In"
        onClick={onLogin}
        loading={isLoading}
      />
    </Container>
  );
};

export { Login };
