type SuccessResponse<T> = [null, T];

/**
 * Creates an standard response for successful operations.
 *
 * This function wraps the provided data in an object with a `null` error value, indicating a successful operation.
 *
 * @param data - The data to be returned in the response.
 * @returns An Array with a `null` error value and the provided data.
 * @template T - The type of data to be returned in the response.
 *
 * @example
 * // Example of creating a success response with user information:
 * const userData = { id: 1, name: "John Doe", email: "john@example.com" };
 * const successResponse = success(userData);
 * console.log(successResponse);
 * // Output: [null, { id: 1, name: "John Doe", email: "john@example.com" }]
 */
export function success<T>(data: T): SuccessResponse<T> {
  return [null, data];
}

/**
 * Creates a standard response for failed operations.
 *
 * This function wraps an error message and stack trace in an object, indicating a failed operation.
 *
 * @param message - The error message to be returned in the response.
 * @param stack - The stack trace associated with the error.
 * @returns An object with a `null` data value and an error object containing the provided error message and stack trace.
 *
 * @example
 * // Example of creating an error response:
 * const errorMessage = "An unexpected error occurred.";
 * const errorStack = "Error: at Object.<anonymous> (path/to/file.js:1:23)";
 * const errorResponse = err(errorMessage, errorStack);
 * console.log(errorResponse);
 * // Output: [{ message: "An unexpected error occurred.", stack: "Error: at Object.<anonymous> (path/to/file.js:1:23)" }, null]
 */

export function err(
  message: string,
  stack: string,
  name: string
): [{ message: string; stack: string; name: string }, null] {
  return [
    {
      message,
      stack,
      name,
    },
    null,
  ];
}
