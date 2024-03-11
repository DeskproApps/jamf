import { cleanup } from "@testing-library/react";
import { MobileDeviceItem } from "../MobileDeviceItem";
import { render, mockSearchMobileDevices } from "../../../../testing";
import type { Props } from "../MobileDeviceItem";

const mockMobileDevice = mockSearchMobileDevices.results[0];

const renderMobileDeviceItem = (props?: Partial<Props>) => render((
  <MobileDeviceItem
    device={props?.device || mockMobileDevice as never}
    onClickTitle={props?.onClickTitle || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("DeviceItem", () => {
  describe("MobileDeviceItem", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderMobileDeviceItem();

      expect(await findByText(/Tinas iPad 2/i)).toBeInTheDocument();
      expect(await findByText(/iPad Air \(Wi-Fi\)/i)).toBeInTheDocument();
      expect(await findByText(/8\.0\.2/i)).toBeInTheDocument();
      expect(await findByText(/CA44CCEE60A3/i)).toBeInTheDocument();
      expect(await findByText(/11\.7 GB/i)).toBeInTheDocument();
    });
  });
});
