import type { components } from "./schema";

export type Response<T> = Promise<T>;

export type Pagination<T> = {
  totalCount?: number;
  results?: T[];
};

export type AuthApiError = {
  error: string;
  error_description: string;
  error_uri: string;
};

export type ErrorDetails = {
  id: string;
  field: null;
  code: null;
  description: string;
};

export type RestApiError = {
  httpStatus: number;
  errors: ErrorDetails[];
};

export type JamfAPIError = AuthApiError|RestApiError;

export type AccessToken = {
  token_type: "Bearer";
  access_token: string;
  expires_in: number; // 299
  scope: string;
};

export type JamfProVersion = components["schemas"]["JamfProVersion"];

export type AuthDetails = components["schemas"]["AuthorizationV1"];

export type Computer = components["schemas"]["ComputerInventory"];

export type MobileDevice = components["schemas"]["MobileDeviceResponse"];

export type Device = Computer|MobileDevice;

export type ComputerDetails = components["schemas"]["ComputerInventory"];

export type MobileDeviceDetails = components["schemas"]["MobileDeviceDetailsGetV2"];

export type DeviceDetails = ComputerDetails|MobileDeviceDetails;
