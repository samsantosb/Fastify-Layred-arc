/**
 * Object containing standard error messages for the API. It includes both fixed and dynamic (parameterized) messages, following the SCREAMING_SNAKE_CASE convention for keys, indicating their use as constants.
 *
 * @type {object}
 * @property {Function} NOT_FOUND - Returns an error message for resources not found.
 * @property {Function} INVALID_DATE - Returns a message for invalid dates.
 * @property {Function} INVALID_ID - Returns a message for invalid IDs.
 * @property {Function} INVALID_COMPANY_ID - Returns a message for invalid company IDs.
 * @property {string} BAD_REQUEST - Message for badly formatted requests.
 * @property {string} UNAUTHORIZED - Message for unauthorized access attempts.
 * @property {string} FORBIDDEN - Message for forbidden accesses.
 * @property {string} INTERNAL_SERVER_ERROR - Message for internal server errors.
 * @property {string} INVALID_CREDENTIALS - Message for invalid credentials.
 * @property {string} RATE_LIMIT_EXCEEDED - Message for exceeded rate limit of requests.
 * @property {string} SECURITY_ACCESS_DENIED - Message for access denied due to security reasons.
 * @property {Function} RESOURCE_CONFLICT - Returns a message for resource conflicts.
 * @property {string} SERVICE_UNAVAILABLE - Message for when the service is unavailable.
 */
export const errorMessages = {
  NOT_FOUND: (resource: string) => `Resource ${resource} not found`,
  INVALID_DATE: (date: string) => `Invalid date: ${date}`,
  INVALID_ID: (id: string) => `Invalid id: ${id}`,
  INVALID_COMPANY_ID: (companyId: string) => `Invalid companyId: ${companyId}`,
  BAD_REQUEST: (reason: string) =>
    reason ? `Bad request: ${reason}` : "Bad request",
  UNAUTHORIZED: (reason: string) =>
    reason ? `Unauthorized: ${reason}` : "Unauthorized",
  FORBIDDEN: "Forbidden",
  INTERNAL_SERVER_ERROR: "Internal server error",
  INVALID_CREDENTIALS: "Invalid credentials",
  RATE_LIMIT_EXCEEDED: "Rate limit exceeded",
  SECURITY_ACCESS_DENIED: "Security access denied",
  RESOURCE_CONFLICT: (resource: string) => `Resource ${resource} conflict`,
  SERVICE_UNAVAILABLE: "Service unavailable",
  AUTHENTICATION_FAILED: "Authentication failed",
};
