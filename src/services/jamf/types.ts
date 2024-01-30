export type Response<T> = Promise<T>;

export type AuthApiError = {
  error: string;
  error_description: string;
  error_uri: string;
};

export type RestApiError = {
  httpStatus: number;
  errors: string[];
};

export type JamfAPIError = AuthApiError|RestApiError;

export type AccessToken = {
  token_type: "Bearer";
  access_token: string;
  expires_in: number; // 299
  scope: string;
};
