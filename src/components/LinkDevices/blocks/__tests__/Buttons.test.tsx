import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../../testing";
import { Buttons } from "../Buttons";
import type { Props } from "../Buttons";

const renderButtons = (props?: Partial<Props>) => render((
  <Buttons
    selectedDevices={props?.selectedDevices || []}
    onCancel={props?.onCancel || jest.fn()}
    onLinkIssues={props?.onLinkIssues || jest.fn()}
    isSubmitting={props?.isSubmitting || false}
  />
), { wrappers: { theme: true } });

describe("LinkDevices", () => {
  describe("Buttons", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByRole } = renderButtons();
      const linkButton = await findByRole("button", { name: "Link Devices" });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      expect(linkButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test("should click \"Link Devices\"", async () => {
      const onLinkCards = jest.fn();
      const { findByRole } = renderButtons({
        selectedDevices:[{} as never],
        onLinkIssues: onLinkCards,
      });
      const linkButton = await findByRole("button", { name: "Link Devices" });

      await userEvent.click(linkButton as Element);

      expect(onLinkCards).toHaveBeenCalledTimes(1);
    });

    test("should click \"Cancel\"", async () => {
      const mockOnCancel = jest.fn();
      const { findByRole } = renderButtons({ onCancel: mockOnCancel });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      await userEvent.click(cancelButton as Element);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });
});
