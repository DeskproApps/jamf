import { cleanup, renderHook } from "@testing-library/react";
import { useExternalLinks } from "../useExternalLinks";
import {
  mockComputer,
  mockMobileDevice,
  mockSearchComputers,
  mockSearchMobileDevices,
} from "../../../testing";
import type { Result } from "../useExternalLinks";

const renderExternalLinks = () => renderHook<Result, unknown>(() => useExternalLinks());

describe("useLogout", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should return computer link", () => {
    const { result: { current: { getComputerLink } } } = renderExternalLinks();

    expect(getComputerLink(mockComputer as never))
      .toBe("https://jamf-pro-instans.test/computers.html?id=100500");
    expect(getComputerLink(mockSearchComputers.results[0] as never))
      .toBe("https://jamf-pro-instans.test/computers.html?id=1");
  });

  test("should return mobile device link", () => {
    const { result: { current: { getMobileDeviceLink } } } = renderExternalLinks();

    expect(getMobileDeviceLink(mockMobileDevice as never))
      .toBe("https://jamf-pro-instans.test/mobileDevices.html?id=105");
    expect(getMobileDeviceLink(mockSearchMobileDevices.results[0] as never))
      .toBe("https://jamf-pro-instans.test/mobileDevices.html?id=20");
  });

  test("shouldn't return link is no pass device", () => {
    const { result: {
      current: { getComputerLink, getMobileDeviceLink } },
    } = renderExternalLinks();

    expect(getComputerLink()).toBe(null);
    expect(getMobileDeviceLink()).toBe(null);
  });
});
