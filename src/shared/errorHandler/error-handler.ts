import { statusCode } from "../statusCode/status-code";
import { errorNamesToStatusCode } from "./enums/error-name-table";

/**
 * Handles errors by constructing an error response object.
 * The function determines the HTTP status code based on the provided name.
 * If the application is in debug mode, as indicated by the DEBUG_MODE environment variable,
 * the stack trace is included in the response.
 *
 * @param {Object} params - The parameters for the error handler.
 * @param {string} params.message - The error message.
 * @param {string} params.stack - The stack trace of the error.
 * @param {string | StatusCodeKey} params.name - The name of the error or a StatusCodeKey representing the HTTP status code.
 * @returns {Object} The error response object. Includes the message and status code.
 * If in debug mode, also includes the stack trace.
 */
export function errorHandler({
  message,
  stack,
  name,
}: {
  message: string;
  stack?: string;
  name: string;
}) {
  const isDebugMode = process.env.DEBUG_MODE === "true";

  const code =
    errorNamesToStatusCode[name as keyof typeof errorNamesToStatusCode] || null;

  const errorResponse = {
    errMessage: message,
    errStatusCode: code || statusCode.INTERNAL_SERVER_ERROR,
  };

  if (isDebugMode) {
    return { ...errorResponse, stack };
  }

  return errorResponse;
}
