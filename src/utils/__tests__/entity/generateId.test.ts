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
    describe("generateId", () => {
      test("should return device metadata as a string", () => {
        expect(entity.generateId(mockSearchComputers.results[0] as never))
          .toEqual(`{"deviceId":"1","type":"Mac"}`);
        expect(entity.generateId(mockComputer as never))
          .toEqual(`{"deviceId":"100500","type":"Mac"}`);
        expect(entity.generateId(mockSearchMobileDevices.results[0] as never))
          .toEqual(`{"deviceId":"20","type":"iOS"}`)
        expect(entity.generateId(mockMobileDevice as never))
          .toEqual(`{"deviceId":"105","type":"ios"}`)
      });

      test("shouldn't return if no data", () => {
        expect(entity.generateId()).toBeUndefined();
      });

      test("shouldn't return if no id", () => {
        expect(entity.generateId(omit(mockSearchComputers.results[0], ["id"]) as never)).toBeUndefined();
        expect(entity.generateId(omit(mockComputer, ["id"]) as never)).toBeUndefined();

        expect(entity.generateId(omit(mockSearchMobileDevices.results[0], ["mobileDeviceId"]) as never)).toBeUndefined();
        expect(entity.generateId(omit(mockMobileDevice, ["id"]) as never)).toBeUndefined();
      });

      test("shouldn't return if no device type", () => {
        expect(entity.generateId(omit(mockSearchComputers, ["general", "platform"]) as never)).toBeUndefined();
        expect(entity.generateId(omit(mockComputer, ["general", "platform"]) as never)).toBeUndefined();

        expect(entity.generateId(omit(mockSearchMobileDevices.results[0], ["deviceType"]) as never)).toBeUndefined();
        expect(entity.generateId(omit(mockMobileDevice, ["type"]) as never)).toBeUndefined();
      });

      test.each(
        [undefined, null, "", 0, true, false, {}]
      )("wrong value: %p", (payload) => {
        expect(entity.generateId(payload as never)).toBeUndefined();
      });
    });
  });
});
