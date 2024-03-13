import { isUnlinkPayload } from "../isUnlinkPayload";
import { mockComputer, mockMobileDevice } from "../../../testing";

describe("isUnlinkPayload", () => {
  test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
    expect(isUnlinkPayload(payload as never)).toBeFalsy();
  });

  test("shouldn't be unlink payload", () => {
    expect(isUnlinkPayload({ type: "unlink" } as never)).toBeFalsy();
  });

  test("should unlink payload", () => {
    expect(isUnlinkPayload({ type: "unlink", device: mockComputer })).toBeTruthy();
    expect(isUnlinkPayload({ type: "unlink", device: mockMobileDevice })).toBeTruthy();
  });
});
