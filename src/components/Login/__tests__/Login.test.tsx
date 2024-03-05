import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { Login } from "../Login";
import type { Props } from "../Login";

const renderLogin = (props?: Partial<Props>) => render((
  <Login
    onLogin={props?.onLogin || jest.fn()}
    isLoading={props?.isLoading || false}
  />
), { wrappers: { theme: true } });

describe("Login", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByRole, findByText } = renderLogin();

    expect(await findByText(/Log into your Jamf Pro Account/i)).toBeInTheDocument();
    expect(await findByRole("button", { name: "Log In" })).toBeInTheDocument();
  });

  test("should call onLogin", async () => {
    const mockOnLogin = jest.fn();
    const { findByRole } = renderLogin({ onLogin: mockOnLogin });
    const loginButton = await findByRole("button", { name: "Log In" });

    await userEvent.click(loginButton);

    expect(mockOnLogin).toHaveBeenCalled();
  });
});
