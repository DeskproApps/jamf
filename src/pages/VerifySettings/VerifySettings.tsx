import { useState, useCallback } from "react";
import { get } from "lodash";
import { P1, Stack } from "@deskpro/deskpro-ui";
import { useDeskproAppEvents, useDeskproAppClient } from "@deskpro/app-sdk";
import { getAuthDetailsService, getAccessTokenService } from "../../services/jamf";
import { nbsp } from "../../constants";
import { Button, Valid, Invalid } from "../../components/common";
import type { FC } from "react";
import type { Settings } from "../../types";
import type { AuthDetails } from "../../services/jamf/types";

const VerifySettings: FC = () => {
  const { client } = useDeskproAppClient();
  const [authDetails, setAuthDetails] = useState<AuthDetails|null>(null);
  const [settings, setSettings] = useState<Settings>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const errorMessage = "Failed to connect to Jamf Pro, settings seem to be invalid";

  const onVerifySettings = useCallback(() => {
    if (!client || !settings) {
      return;
    }

    setIsLoading(true);
    setError("");
    setAuthDetails(null);

    return getAccessTokenService(client, settings)
      .then(({ access_token }) => getAuthDetailsService(client, settings, access_token))
      .then(setAuthDetails)
      .catch(() => setError(errorMessage))
      .finally(() => setIsLoading(false));
  }, [client, settings, errorMessage]);

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, [client]);

  return (
    <Stack align="baseline">
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        disabled={isLoading || !settings?.instance_url || !settings?.client_id || !settings?.client_secret}
      />
      {nbsp}
      {authDetails
        ? <P1>Verified as <Valid>{`<${
          get(authDetails, ["account", "realName"]) || get(authDetails, ["account", "username"])
        }>`}</Valid></P1>
        : <Invalid type="p1">{error}</Invalid> || ""
      }
    </Stack>
  );
};

export { VerifySettings };
