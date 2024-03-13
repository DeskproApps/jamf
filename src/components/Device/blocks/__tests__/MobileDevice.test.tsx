import { cleanup } from "@testing-library/react";
import { render, mockMobileDevice } from "../../../../../testing";
import { MobileDevice } from "../MobileDevice";
import type { Props } from "../MobileDevice";

const renderMobileDevice = (props?: Partial<Props>) => render((
  <MobileDevice device={props?.device || mockMobileDevice as never}/>
), { wrappers: { theme: true } });

describe("Device", () => {
  describe("MobileDevice", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderMobileDevice();

      expect(await findByText(/Device 101/i)).toBeInTheDocument();
      expect(await findByText(/George R\. R\. Martin/i)).toBeInTheDocument();
      expect(await findByText(/105/i)).toBeInTheDocument();
      expect(await findByText(/iPad mini \(Wi-Fi Only\)/i)).toBeInTheDocument();
      expect(await findByText(/8\.0\.2/i)).toBeInTheDocument();
      expect(await findByText(/CA450C0460A3/i)).toBeInTheDocument();
      expect(await findByText(/12\.72 GB \(12\.23 GB free\)/i)).toBeInTheDocument();
    });
  });
});
