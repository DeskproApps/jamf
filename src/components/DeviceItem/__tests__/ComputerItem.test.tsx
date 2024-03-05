import { cleanup } from "@testing-library/react";
import { ComputerItem } from "../ComputerItem";
import { render, mockSearchComputers } from "../../../../testing";
import type { Props } from "../ComputerItem";

const mockCustomer = mockSearchComputers.results[0];

const renderComputerItem = (props?: Partial<Props>) => render((
  <ComputerItem
    device={props?.device || mockCustomer as never}
    onClickTitle={props?.onClickTitle || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("DeviceItem", () => {
  describe("ComputerItem", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderComputerItem();

      expect(await findByText(/ilia's mac book/i)).toBeInTheDocument();
      expect(await findByText(/MacBook Pro \(16-inch, 2019\)/i)).toBeInTheDocument();
      expect(await findByText(/14\.2\.1/i)).toBeInTheDocument();
      expect(await findByText(/C02ZW1CNMD6W/i)).toBeInTheDocument();
      expect(await findByText(/977\.1 GB/i)).toBeInTheDocument();
    });
  });
});
