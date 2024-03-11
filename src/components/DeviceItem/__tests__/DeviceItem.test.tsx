import { cleanup } from "@testing-library/react";
import { DeviceItem } from "../DeviceItem";
import {
  render,
  mockSearchComputers,
  mockSearchMobileDevices,
} from "../../../../testing";
import type { Props } from "../DeviceItem";

const mockComputer = mockSearchComputers.results[0];
const mockMobileDevice = mockSearchMobileDevices.results[0];

const renderDeviceItem = (props?: Partial<Props>) => render((
  <DeviceItem
    device={props?.device || undefined as never}
    onClickTitle={props?.onClickTitle || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("DeviceItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render computer item", async () => {
    const { findByText } = renderDeviceItem({ device: mockComputer as never });
    expect(await findByText(/ilia's mac book/i)).toBeInTheDocument();
  });

  test("render mobile device item", async () => {
    const { findByText } = renderDeviceItem({ device: mockMobileDevice as never });
    expect(await findByText(/Tinas iPad 2/i)).toBeInTheDocument();
  });
});
