import { cleanup, act } from "@testing-library/react";
import { setEntityService, getEntityListService } from "../../services/deskpro";
import { searchComputersService, searchMobileDevicesService } from "../../services/jamf";
import { tryToLinkAutomatically } from "../tryToLinkAutomatically";
import {
  mockClient,
  mockContext,
  mockSearchComputers,
  mockSearchMobileDevices,
} from "../../../testing";

jest.mock("../../services/deskpro/setEntityService");
jest.mock("../../services/deskpro/getEntityListService");
jest.mock("../../services/jamf/searchComputersService");
jest.mock("../../services/jamf/searchMobileDevicesService");

describe("utils", () => {
  describe("tryToLinkAutomatically", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("shouldn't link devices if no dpUser", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue([]);
      (setEntityService as jest.Mock).mockResolvedValue({ customAppEntityAssociationSet: true });
      (searchComputersService as jest.Mock).mockResolvedValue({ results: [] });
      (searchMobileDevicesService as jest.Mock).mockResolvedValue({ results: [] });

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never);
      });

      expect(getEntityListService).not.toHaveBeenCalled();
      expect(searchComputersService).not.toHaveBeenCalled();
      expect(searchMobileDevicesService).not.toHaveBeenCalled();
      expect(setEntityService).not.toHaveBeenCalled();
    });

    test("shouldn't link devices if no found", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue([]);
      (setEntityService as jest.Mock).mockResolvedValue({ customAppEntityAssociationSet: true });
      (searchComputersService as jest.Mock).mockResolvedValue({ results: [] });
      (searchMobileDevicesService as jest.Mock).mockResolvedValue({ results: [] });

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, mockContext.data.user);
      });

      expect(getEntityListService).toHaveBeenCalled();
      expect(searchComputersService).toHaveBeenCalled();
      expect(searchMobileDevicesService).toHaveBeenCalled();
      expect(setEntityService).not.toHaveBeenCalled();
    });

    test("shouldn't link devices if all devices already linked", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue([
        `{"deviceId":"1","type":"Mac"}`,
        `{"deviceId":"64","type":"Mac"}`,
        `{"deviceId":"20","type":"iOS"}`,
      ]);
      (setEntityService as jest.Mock).mockResolvedValue({ customAppEntityAssociationSet: true });
      (searchComputersService as jest.Mock).mockResolvedValue(mockSearchComputers);
      (searchMobileDevicesService as jest.Mock).mockResolvedValue(mockSearchMobileDevices);

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, mockContext.data.user);
      });

      expect(getEntityListService).toHaveBeenCalled();
      expect(searchComputersService).toHaveBeenCalled();
      expect(searchMobileDevicesService).toHaveBeenCalled();
      expect(setEntityService).not.toHaveBeenCalled();
    });

    test("should link devices", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue([]);
      (setEntityService as jest.Mock).mockResolvedValue({ customAppEntityAssociationSet: true });
      (searchComputersService as jest.Mock).mockResolvedValue(mockSearchComputers);
      (searchMobileDevicesService as jest.Mock).mockResolvedValue(mockSearchMobileDevices);

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, mockContext.data.user);
      });

      expect(getEntityListService).toHaveBeenCalled();
      expect(searchComputersService).toHaveBeenCalled();
      expect(searchMobileDevicesService).toHaveBeenCalled();
      expect(setEntityService).toHaveBeenCalledTimes(3);
    });
  });
});
