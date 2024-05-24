import type { JamfAPIError } from "./types";

export type InitData = {
  status: number,
  data: JamfAPIError,
};

class JamfError extends Error {
  status: number;
  data: JamfAPIError;

  constructor({ status, data }: InitData) {
    super("Jamf Api Error");

    this.data = data;
    this.status = status;
  }
}

export { JamfError };
