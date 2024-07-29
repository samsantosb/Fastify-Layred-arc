/**
 * HTTP status codes and their respective numeric values.
 *
 * @constant
 * @readonly
 * @enum {number}
 */
export const statusCode = {
  /** The request has succeeded. */
  OK: 200,

  /** The request has succeeded and a new resource has been created as a result. */
  CREATED: 201,

  /** The request has been received but not yet acted upon. */
  ACCEPTED: 202,

  /** There is no content to send for this request, but the headers may be useful. */
  NO_CONTENT: 204,

  /** The server could not understand the request due to invalid syntax. */
  BAD_REQUEST: 400,

  /** The client must authenticate itself to get the requested response. */
  UNAUTHORIZED: 401,

  /** The client does not have access rights to the content. */
  FORBIDDEN: 403,

  /** The server can not find the requested resource. */
  NOT_FOUND: 404,

  /** The request method is known by the server but has been disabled and cannot be used. */
  METHOD_NOT_ALLOWED: 405,

  /** This code is similar to 401 (Unauthorized), but indicates that the client must first authenticate itself with the proxy. */
  PROXY_AUTHENTICATION_REQUIRED: 407,

  /** The server would like to shut down this unused connection. */
  REQUEST_TIMEOUT: 408,

  /** This response is sent when a request conflicts with the current state of the server. */
  CONFLICT: 409,

  /** This response is sent when the requested content has been permanently deleted from server, with no forwarding address. */
  GONE: 410,

  /** Server rejected the request because the Content-Length header field is not defined and the server requires it. */
  LENGTH_REQUIRED: 411,

  /** The client has indicated preconditions in its headers which the server does not meet. */
  PRECONDITION_FAILED: 412,

  /** Request entity is larger than limits defined by server. */
  PAYLOAD_TOO_LARGE: 413,

  /** The URI requested by the client is longer than the server is willing to interpret. */
  URI_TOO_LONG: 414,

  /** The media format of the requested data is not supported by the server. */
  UNSUPPORTED_MEDIA_TYPE: 415,

  /** The range specified by the Range header field in the request can't be fulfilled. */
  RANGE_NOT_SATISFIABLE: 416,

  /** This response code means the expectation indicated by the Expect request header field can't be met by the server. */
  EXPECTATION_FAILED: 417,

  /** Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". */
  IM_A_TEAPOT: 418,

  /** The request was directed at a server that is not able to produce a response. */
  MISDIRECTED_REQUEST: 421,

  /** The request was well-formed but was unable to be followed due to semantic errors. */
  UNPROCESSABLE_ENTITY: 422,

  /** The server has encountered a situation it doesn't know how to handle. */
  INTERNAL_SERVER_ERROR: 500,

  /** The request method is not supported by the server and cannot be handled. */
  NOT_IMPLEMENTED: 501,

  /** The server is not ready to handle the request. */
  SERVICE_UNAVAILABLE: 503,

  /** The server is acting as a gateway and cannot get a response in time. */
  GATEWAY_TIMEOUT: 504,

  /** The HTTP version used in the request is not supported by the server. */
  HTTP_VERSION_NOT_SUPPORTED: 505,

  /** The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process. */
  VARIANT_ALSO_NEGOTIATES: 506,

  /** The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. */
  INSUFFICIENT_STORAGE: 507,

  /** The server detected an infinite loop while processing a request with "Depth: infinity". */
  LOOP_DETECTED: 508,

  /** Further extensions to the request are required for the server to fulfill it. */
  NOT_EXTENDED: 510,

  /** The client needs to authenticate to gain network access. */
  NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;
