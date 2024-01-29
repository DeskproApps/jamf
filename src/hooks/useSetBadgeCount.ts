import { size } from "lodash";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";

const useSetBadgeCount = <T>(items: Array<T>) => {
  useInitialisedDeskproAppClient((client) => {
    if (!Array.isArray(items)) {
      return;
    }

    client.setBadgeCount(size(items));
  }, [items]);
};

export { useSetBadgeCount };
