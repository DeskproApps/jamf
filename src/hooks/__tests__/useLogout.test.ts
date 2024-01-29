import { cleanup, renderHook, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { removeAccessTokenService } from "../../services/deskpro";
import { invalidateAccessTokenService } from "../../services/jamf";
import { useLogout } from "../useLogout";
import type { Result } from "../useLogout";

const renderLogoutHook = () => renderHook<Result, unknown>(() => useLogout());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../../services/deskpro/removeAccessTokenService");
jest.mock("../../services/jamf/invalidateAccessTokenService");

describe("useLogout", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should remove and invalidate token and navigate to login page", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (removeAccessTokenService as jest.Mock).mockResolvedValueOnce("");
    (invalidateAccessTokenService as jest.Mock).mockResolvedValueOnce("");

    const { result } = renderLogoutHook();

    await act(async () => {
      await result.current.logout();
    })

    expect(removeAccessTokenService).toHaveBeenCalled();
    expect(invalidateAccessTokenService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("should navigate to login page if remove token in store failed", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (removeAccessTokenService as jest.Mock).mockRejectedValueOnce("");
    (invalidateAccessTokenService as jest.Mock).mockResolvedValueOnce("");

    const { result } = renderLogoutHook();

    await act(async () => {
      await result.current.logout();
    })

    expect(removeAccessTokenService).toHaveBeenCalled();
    expect(invalidateAccessTokenService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("should navigate to login page if invalidate token failed", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (removeAccessTokenService as jest.Mock).mockResolvedValueOnce("");
    (invalidateAccessTokenService as jest.Mock).mockRejectedValueOnce("");

    const { result } = renderLogoutHook();

    await act(async () => {
      await result.current.logout();
    })

    expect(removeAccessTokenService).not.toHaveBeenCalled();
    expect(invalidateAccessTokenService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
