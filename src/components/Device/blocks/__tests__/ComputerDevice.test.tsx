import { cleanup } from "@testing-library/react";
import { render, mockComputer } from "../../../../../testing";
import { ComputerDevice } from "../ComputerDevice";
import type { Props } from "../ComputerDevice";

const renderComputer = (props?: Partial<Props>) => render((
  <ComputerDevice device={props?.device || mockComputer as never}/>
), { wrappers: { theme: true } });

describe("Device", () => {
  describe("ComputerDevice", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderComputer();

      expect(await findByText(/ilia's mac book/i)).toBeInTheDocument();
      expect(await findByText(/George R\. R\. Martin/i)).toBeInTheDocument();
      expect(await findByText(/100500/i)).toBeInTheDocument();
      expect(await findByText(/MacBook Pro \(16-inch, 2019\)/i)).toBeInTheDocument();
      expect(await findByText(/C02ZW1CNMD6W/i)).toBeInTheDocument();
      expect(await findByText(/14\.2\.1/i)).toBeInTheDocument();
      expect(await findByText(/977\.1 GB \(764\.69 GB free\)/i)).toBeInTheDocument();
    });
  });
});
