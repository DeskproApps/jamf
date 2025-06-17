import './instrument';
import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { DeskproAppProvider, LoadingSpinner } from "@deskpro/app-sdk";
import { queryClient } from "./query";
import { App } from "./App";

import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";
import "simplebar/dist/simplebar.min.css";
import "./main.css";
import { Scrollbar } from "@deskpro/deskpro-ui";
import { ErrorBoundary, reactErrorHandler } from '@sentry/react';
import { ErrorFallback } from './components';

const root = ReactDOM.createRoot(document.getElementById('root') as Element, {
  onRecoverableError: reactErrorHandler(),
});
root.render((
  <StrictMode>
    <Scrollbar style={{ height: "100%", width: "100%" }}>
      <DeskproAppProvider>
        <HashRouter>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingSpinner />}>
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary onReset={reset} fallback={ErrorFallback}>
                    <App />
                  </ErrorBoundary>
                )}
              </QueryErrorResetBoundary>
            </Suspense>
          </QueryClientProvider>
        </HashRouter>
      </DeskproAppProvider>
    </Scrollbar>
  </StrictMode>
));
