import { useMemo, useState, useCallback } from "react";
import { get, size } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import {
  getEntityListService,
  setAccessTokenService,
} from "../../services/deskpro";
import {
  getAccessTokenService,
  getJamfProVersionService,
} from "../../services/jamf";
import { useAsyncError } from "../../hooks";
import type { UserContext } from "../../types";

type UseLogin = () => {
  isLoading: boolean;
  onLogin: () => void;
};

const useLogin: UseLogin = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const onLogin = useCallback(() => {
    if (!client || !dpUserId) {
      return;
    }

    setIsLoading(true);

    getAccessTokenService(client)
      .then(({ access_token }) => setAccessTokenService(client, access_token))
      .then(() => getJamfProVersionService(client))
      .then(() => getEntityListService(client, dpUserId))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/devices/link"))
      .catch(asyncErrorHandler)
      .finally(() => setIsLoading(false));
  }, [client, dpUserId, navigate, asyncErrorHandler]);

  return { isLoading, onLogin };
};

export { useLogin };
