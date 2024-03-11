import { isMac } from "../isMac";
import { mockSearchMobileDevices, mockSearchComputers } from "../../../testing";

describe("utils", () => {
  describe("isMac", () => {
    test("should be Mac", () => {
      expect(isMac(mockSearchComputers.results[0] as never)).toBeTruthy();
      expect(isMac({ deviceId: "1", type: "Mac" })).toBeTruthy();
    });

    test("shouldn't be Mac", () => {
      expect(isMac()).toBeFalsy();
      expect(isMac(mockSearchMobileDevices.results[0] as never)).toBeFalsy();
      expect(isMac({ deviceId: "105", type: "iOS" })).toBeFalsy();
    });
  });
});
