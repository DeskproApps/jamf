import { isMobile } from "../isMobile";
import { mockSearchMobileDevices, mockSearchComputers } from "../../../testing";

describe("utils", () => {
  describe("isMobile", () => {
    test("should be Mobile Device", () => {
      expect(isMobile(mockSearchMobileDevices.results[0] as never)).toBeTruthy();
    });

    test("shouldn't be Mobile Device", () => {
      expect(isMobile()).toBeFalsy();
      expect(isMobile(mockSearchComputers.results[0] as never)).toBeFalsy();
    });
  });
});
