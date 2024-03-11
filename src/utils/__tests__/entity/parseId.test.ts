import { entity } from "../../entity";

describe("utils", () => {
  describe("entity", () => {
    describe("parseId", () => {
      test("should return computer data", () => {
        expect(entity.parseId(`{"deviceId":"1","type":"Mac"}`))
          .toStrictEqual({ deviceId: "1", type: "Mac"});
      });

      test("should return mobile device data", () => {
        expect(entity.parseId(`{"deviceId":"20","type":"iOS"}`))
          .toStrictEqual({ deviceId: "20", type: "iOS"});
      });

      test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
        expect(entity.parseId(payload as never)).toBeUndefined()
      });
    });
  });
});
