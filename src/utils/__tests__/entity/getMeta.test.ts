import { entity } from "../../entity";
import { omit } from "lodash";
import { mockSearchMobileDevices, mockSearchComputers } from "../../../../testing";

const mockComputer = mockSearchComputers.results[0];
const mockMobileDevice = mockSearchMobileDevices.results[0];

describe("utils", () => {
  describe("entity", () => {
    describe("getMeta", () => {
      test("should return device metadata", () => {
        expect(entity.getMeta(mockComputer as never))
          .toEqual({ deviceId: "1", type: "Mac" });

        expect(entity.getMeta(mockMobileDevice as never))
          .toEqual({ deviceId: "20", type: "iOS" })
      });

      test("shouldn't return if no data", () => {
        expect(entity.getMeta()).toBeUndefined();
      });

      test("shouldn't return if no id", () => {
        const computer = omit(mockComputer, ["id"]);
        expect(entity.getMeta(computer as never)).toBeUndefined();

        const mobileDevice = omit(mockMobileDevice, ["mobileDeviceId"]);
        expect(entity.getMeta(mobileDevice as never)).toBeUndefined();
      });

      test("shouldn't return if no device type", () => {
        const computer = omit(mockComputer, ["general", "platform"]);
        expect(entity.getMeta(computer as never)).toBeUndefined();

        const mobileDevice = omit(mockMobileDevice, ["deviceType"]);
        expect(entity.getMeta(mobileDevice as never)).toBeUndefined();
      });

      test.each(
        [undefined, null, "", 0, true, false, {}]
      )("wrong value: %p", (payload) => {
        expect(entity.getMeta(payload as never)).toBeUndefined();
      });
    });
  });
});
