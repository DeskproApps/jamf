import { entity } from "../../entity";
import { omit } from "lodash";
import {
  mockComputer,
  mockMobileDevice,
  mockSearchComputers,
  mockSearchMobileDevices,
} from "../../../../testing";

describe("utils", () => {
  describe("entity", () => {
    describe("getMeta", () => {
      test("should return device metadata", () => {
        expect(entity.getMeta(mockSearchComputers.results[0] as never))
          .toEqual({ deviceId: "1", type: "Mac" });
        expect(entity.getMeta(mockComputer as never))
          .toEqual({ deviceId: "100500", type: "Mac" });

        expect(entity.getMeta(mockSearchMobileDevices.results[0] as never))
          .toEqual({ deviceId: "20", type: "iOS" })
        expect(entity.getMeta(mockMobileDevice as never))
          .toEqual({ deviceId: "105", type: "ios" })
      });

      test("shouldn't return if no data", () => {
        expect(entity.getMeta()).toBeUndefined();
      });

      test("shouldn't return if no id", () => {
        expect(entity.getMeta(omit(mockSearchComputers.results[0] as never, ["id"]))).toBeUndefined();
        expect(entity.getMeta(omit(mockComputer, ["id"]) as never)).toBeUndefined();

        expect(entity.getMeta(omit(mockSearchMobileDevices.results[0], ["mobileDeviceId"]) as never)).toBeUndefined();
        expect(entity.getMeta(omit(mockMobileDevice, ["id"]) as never)).toBeUndefined();
      });

      test("shouldn't return if no device type", () => {
        expect(entity.getMeta(omit(mockSearchComputers.results[0], ["general", "platform"]) as never)).toBeUndefined();
        expect(entity.getMeta(omit(mockComputer, ["general", "platform"]) as never)).toBeUndefined();

        expect(entity.getMeta(omit(mockSearchMobileDevices.results[0], ["deviceType"]) as never)).toBeUndefined();
        expect(entity.getMeta(omit(mockMobileDevice, ["type"]) as never)).toBeUndefined();
      });

      test.each(
        [undefined, null, "", 0, true, false, {}]
      )("wrong value: %p", (payload) => {
        expect(entity.getMeta(payload as never)).toBeUndefined();
      });
    });
  });
});
