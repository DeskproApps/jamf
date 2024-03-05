import { useMemo, useState, useCallback } from "react";
import { get, size, cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useDebouncedCallback } from "use-debounce";
import { setEntityService } from "../../services/deskpro";
import { useSearch } from "./hooks";
import { entity } from "../../utils";
import { LinkDevices } from "../../components";
import type { FC } from "react";
import type { UserContext } from "../../types";
import type { Device } from "../../services/jamf/types";

const LinkDevicesPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const { isLoading, devices } = useSearch(searchQuery);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const onChangeSearchQuery = useDebouncedCallback(setSearchQuery, 1000);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onChangeSelectedDevice = useCallback((device: Device) => {
    let newSelectedDevices = cloneDeep(selectedDevices);

    if (
      selectedDevices.some(
        (selectedDevice) => entity.generateId(device) === entity.generateId(selectedDevice)
      )
    ) {
      newSelectedDevices = selectedDevices.filter((selectedDevice) => {
        return entity.generateId(selectedDevice) !== entity.generateId(device);
      });
    } else {
      newSelectedDevices.push(device);
    }

    setSelectedDevices(newSelectedDevices);
  }, [selectedDevices]);

  const onLinkDevices = useCallback(() => {
    if (!client || !dpUserId || !size(selectedDevices)) {
      return;
    }

    setIsSubmitting(true);

    return Promise.all([
      ...selectedDevices.map((device) => {
        const entityId = entity.generateId(device);
        return !entityId
          ? Promise.resolve()
          : setEntityService(client, dpUserId, entityId);
      }),
    ])
      .then(() => navigate("/home"))
      .finally(() => setIsSubmitting(false));
  }, [client, dpUserId, selectedDevices, navigate]);

  useSetTitle("Link Devices");

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <LinkDevices
      devices={devices}
      onCancel={onCancel}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onLinkDevices={onLinkDevices}
      selectedDevices={selectedDevices}
      onChangeSearchQuery={onChangeSearchQuery}
      onChangeSelectedDevice={onChangeSelectedDevice}
    />
  );
};

export { LinkDevicesPage };
