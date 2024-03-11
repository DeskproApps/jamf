import { entity } from "../../entity";
import { omit } from "lodash";
import { mockSearchMobileDevices, mockSearchComputers } from "../../../../testing";

const mockComputer = mockSearchComputers.results[0];
const mockMobileDevice = mockSearchMobileDevices.results[0];

describe("utils", () => {
  describe("entity", () => {
    describe("generateId", () => {
      test("should return device metadata as a string", () => {
        expect(entity.generateId(mockComputer as never))
          .toEqual(`{"deviceId":"1","type":"Mac"}`);

        expect(entity.generateId(mockMobileDevice as never))
          .toEqual(`{"deviceId":"20","type":"iOS"}`)
      });

      test("shouldn't return if no data", () => {
        expect(entity.generateId()).toBeUndefined();
      });

      test("shouldn't return if no id", () => {
        const computer = omit(mockComputer, ["id"]);
        expect(entity.generateId(computer as never)).toBeUndefined();

        const mobileDevice = omit(mockMobileDevice, ["mobileDeviceId"]);
        expect(entity.generateId(mobileDevice as never)).toBeUndefined();
      });

      test("shouldn't return if no device type", () => {
        const computer = omit(mockComputer, ["general", "platform"]);
        expect(entity.generateId(computer as never)).toBeUndefined();

        const mobileDevice = omit(mockMobileDevice, ["deviceType"]);
        expect(entity.generateId(mobileDevice as never)).toBeUndefined();
      });

      test.each(
        [undefined, null, "", 0, true, false, {}]
      )("wrong value: %p", (payload) => {
        expect(entity.generateId(payload as never)).toBeUndefined();
      });
    });
  });
});
