import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { NoFoundDevices } from "../NoFoundDevices";
import type { Props } from "../NoFoundDevices";

const renderNoFoundIssues = (props?: Partial<Props>) => render((
  <NoFoundDevices
    devices={props?.devices as never}
    children={props?.children || "" as never}
  />
), { wrappers: { theme: true } });

describe("NoFoundIssues", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderNoFoundIssues();
    expect(await findByText(/No found/i)).toBeInTheDocument();
  });

  test("should show \"No Space issues found\" if no issues", async () => {
    const { findByText } = renderNoFoundIssues({ devices: [] });
    expect(await findByText(/No devices found/i)).toBeInTheDocument();
  });

  test("should show passing \"children\" if issues exist", async () => {
    const { findByText } = renderNoFoundIssues({
      devices: [{ id: "001" }] as never[],
      children: () => "Some content",
    });

    expect(await findByText(/Some content/i)).toBeInTheDocument();
  });
});
