import { cleanup } from "@testing-library/react";
import { Home } from "../Home";
import {
  render,
  mockSearchComputers,
  mockSearchMobileDevices,
} from "../../../../testing";
import type { Props } from "../Home";

const renderHome = (props?: Partial<Props>) => render((
  <Home
    devices={props?.devices || [
      ...mockSearchComputers.results,
      ...mockSearchMobileDevices.results
    ] as never[]}
  />
), { wrappers: { theme: true } });

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderHome();

    expect(await findByText(/ilia's mac book/i)).toBeInTheDocument();
    expect(await findByText(/Tinas iPad 2/i)).toBeInTheDocument();
    expect(await findByText(/Bitegrove/i)).toBeInTheDocument();
  });
});
