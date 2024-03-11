import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 2000,
    },
  },
});

const QueryKey = {
  SEARCH_COMPUTER: "searchComputer",
  SEARCH_MOBILE: "searchMobile",
  LINKED_DEVICES: "linkedDevices",
  MOBILE_DEVICE: "mobileDevice",
  COMPUTER: "computer",
}

export { queryClient, QueryKey };
