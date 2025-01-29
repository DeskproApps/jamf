import { useState, useMemo, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { deleteEntityService } from "../services/deskpro";
import { entity } from "../utils";
import { useAsyncError } from "./useAsyncError";
import type { UserContext } from "../types";
import type { DeviceDetails } from "../services/jamf/types";

export type Result = {
  isLoading: boolean,
  unlink: (device: DeviceDetails) => void,
};

const useUnlinkDevice = (): Result => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const unlink = useCallback((device: DeviceDetails) => {
    const deviceId = entity.generateId(device);
    if (!client || !deviceId) {
      return;
    }

    setIsLoading(true);

    deleteEntityService(client, dpUserId ?? "", deviceId)
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      })
      .catch(asyncErrorHandler);
  }, [client, dpUserId, navigate, asyncErrorHandler]);

  return { isLoading, unlink };
};

export { useUnlinkDevice };
