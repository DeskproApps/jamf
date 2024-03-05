/** Typo */
export const nbsp = "\u00A0";

/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

/** Deskpro */
export const APP_PREFIX = "jamf-pro";

export const ENTITY = "linkedJamfDevices";

export const DEFAULT_ERROR = "There was an error!";

export const ACCESS_TOKEN_PATH = "oauth2/access_token";

export const placeholders = {
  INSTANCE_URL: "__instance_url__",
  ACCESS_TOKEN: `[user[${ACCESS_TOKEN_PATH}]]`,
  CLIENT_ID: "__client_id__",
  CLIENT_SECRET: "__client_secret__",
};

/** Jamf Pro */
export const AUTH_URL = `${placeholders.INSTANCE_URL}/api/oauth`;

export const BASE_URL = `${placeholders.INSTANCE_URL}/api`;
