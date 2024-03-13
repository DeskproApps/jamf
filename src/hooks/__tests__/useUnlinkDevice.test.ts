import { cleanup, renderHook, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { deleteEntityService } from "../../services/deskpro";
import { useUnlinkDevice } from "../useUnlinkService";
import { mockComputer } from "../../../testing";
import type { Result } from "../useUnlinkService";

const renderUnlinkDevice = () => renderHook<Result, unknown>(() => useUnlinkDevice());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../../services/deskpro/deleteEntityService");

describe("useLogout", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("shouldn't navigate to home page if unlink device failed", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (deleteEntityService as jest.Mock).mockRejectedValue("");

    const { result } = renderUnlinkDevice();

    try {
      await act(async () => {
        await result.current.unlink(mockComputer);
      })
    } catch (e) {
      expect(deleteEntityService).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    }
  });

  test("should unlink device and navigate to home page", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (deleteEntityService as jest.Mock).mockResolvedValueOnce("");

    const { result } = renderUnlinkDevice();

    await act(async () => {
      await result.current.unlink(mockComputer);
    })

    expect(deleteEntityService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("shouldn't unlink if no pass device", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (deleteEntityService as jest.Mock).mockResolvedValueOnce("");

    const { result } = renderUnlinkDevice();

    await act(async () => {
      await result.current.unlink(null as never);
    })

    expect(deleteEntityService).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalledWith("/home");
  });
});
