import { cleanup } from "@testing-library/react";
import { Devices } from "../Devices";
import {
  render,
  mockSearchComputers,
  mockSearchMobileDevices,
} from "../../../../../testing";
import type { Props } from "../Devices";

const renderDevices = (props?: Partial<Props>) => render((
  <Devices
    isLoading={props?.isLoading || false}
    devices={props?.devices || []}
    selectedDevices={props?.selectedDevices || []}
    onChangeSelectedDevice={props?.onChangeSelectedDevice || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkDevices", () => {
  describe("Devices", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderDevices({
        devices: [
          ...mockSearchComputers.results,
          ...mockSearchMobileDevices.results,
        ] as never[],
      });

      expect(await findByText(/ilia's mac book/i)).toBeInTheDocument();
      expect(await findByText(/Tinas iPad 2/i)).toBeInTheDocument();
      expect(await findByText(/Bitegrove/i)).toBeInTheDocument();
    });
  });
});
