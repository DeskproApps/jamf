import { get } from "lodash";
import { match } from "ts-pattern";
import { Stack } from "@deskpro/deskpro-ui";
import { DEFAULT_ERROR } from "../../constants";
import { JamfError } from "../../services/jamf";
import { Button, Container, ErrorBlock } from "../common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
  error: Error|JamfError,
};

const ErrorFallback: FC<Props> = ({ error, resetErrorBoundary }) => {
  let message = DEFAULT_ERROR;
  let button = null;
  let consoleMessage;

  if (error instanceof JamfError) {
    consoleMessage = error;

    message = match(get(error, ["data", "httpStatus"]))
      .with(401, () => "Authentication failed. Verify the credentials being used for the request.")
      .with(403, () => "Invalid permissions. Verify the account being used has the proper permissions for the resource you are trying to access.")
      .otherwise(() => get(error, ["data", "error_description"])
        || get(error, ["data", "error"])
        || get(error, ["data", "errors", 0, "description"])
        || DEFAULT_ERROR
      )

    button = match(get(error, ["data", "httpStatus"]))
      .with(401, () => (
        <Button
          text="Log In"
          intent="secondary"
          onClick={() => resetErrorBoundary({ type: "changePage", path: "/login" })}
        />
      ))
      .otherwise(() => null);
  }

  // eslint-disable-next-line no-console
  console.error(consoleMessage || error);

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
            {button}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
