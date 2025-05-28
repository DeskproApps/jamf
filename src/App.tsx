import { useCallback } from "react";
import { get } from "lodash";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useLogout, useUnlinkDevice } from "./hooks";
import { isNavigatePayload, isUnlinkPayload } from "./utils";
import {
  HomePage,
  LoginPage,
  DevicePage,
  VerifySettings,
  LoadingAppPage,
  LinkDevicesPage,
} from "./pages";
import { ErrorFallback } from "./components";
import type { FC } from "react";
import type { EventPayload } from "./types";
import { ErrorBoundary } from "@sentry/react";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { logout, isLoading: isLoadingLogout } = useLogout();
  const { unlink, isLoading: isLoadingUnlink } = useUnlinkDevice();
  const isLoading = isLoadingLogout || isLoadingUnlink;

  const handlePayload = useCallback((payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => isNavigatePayload(payload) && navigate(payload.path))
      .with("logout", logout)
      .with("unlink", () => isUnlinkPayload(payload) && unlink(payload.device))
      .run();
  }, [navigate, logout, unlink]);

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    handlePayload(payload);
  }, 500);

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (!client || isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ErrorBoundary
      fallback={ErrorFallback}
      onReset={(payload) => handlePayload(get(payload, ["args", 0]))}
    >
      <Routes>
        <Route path="/admin/verify_settings" element={<VerifySettings/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/devices/link" element={<LinkDevicesPage/>} />
        <Route path="/devices/:deviceId/:type" element={<DevicePage/>} />
        <Route index element={<LoadingAppPage/>} />
      </Routes>
    </ErrorBoundary>
  );
};

export { App };
