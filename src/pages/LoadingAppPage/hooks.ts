import { useMemo } from "react";
import { get, size } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { getJamfProVersionService } from "../../services/jamf";
import type { UserContext } from "../../types";

type UseCheckAuth = () => void;

const useCheckAuth: UseCheckAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  useInitialisedDeskproAppClient((client) => {
    if (!dpUserId) {
      return;
    }

    getJamfProVersionService(client)
      .then(() => getEntityListService(client, dpUserId))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/devices/link"))
      .catch(() => navigate("/login"))
  }, [dpUserId]);
};

export { useCheckAuth };
