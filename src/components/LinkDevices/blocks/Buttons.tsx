import size from "lodash/size";
import { Stack } from "@deskpro/deskpro-ui";
import { Button } from "../../common";
import type { FC } from "react";
import type { Device } from "../../../services/jamf/types";

export type Props = {
  isSubmitting: boolean,
  onCancel: () => void,
  selectedDevices: Device[],
  onLinkIssues: () => void,
};

const Buttons: FC<Props> = ({ isSubmitting, selectedDevices, onLinkIssues, onCancel }) => (
  <Stack justify="space-between">
    <Button
      type="button"
      text="Link Devices"
      disabled={!size(selectedDevices) || isSubmitting}
      loading={isSubmitting}
      onClick={onLinkIssues}
    />
    <Button
      type="button"
      text="Cancel"
      intent="secondary"
      onClick={onCancel}
    />
  </Stack>
);

export { Buttons };
