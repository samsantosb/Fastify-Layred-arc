// import { errorHandler } from "../error-handler";
// import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
// import { ZodError } from "zod";
// import { statusCode } from "../../statusCode/status-code";

// type ErrorResponse = {
//   errStatusCode: number;
//   errMessage: string;
// };

// export async function errorHandlingMiddleware(
//   this: FastifyInstance,
//   error: Error,
//   request: FastifyRequest,
//   reply: FastifyReply
// ): Promise<void> {
//   if (error instanceof ZodError) {
//     reply
//       .status(statusCode.BAD_REQUEST)
//       .send({ message: JSON.parse(error.message)[0].message });
//     return;
//   }

//   const { errStatusCode, errMessage }: ErrorResponse = errorHandler(error);

//   reply
//     .status(errStatusCode || statusCode.INTERNAL_SERVER_ERROR)
//     .send({ message: errMessage || "Internal server error" });

//   if (process.env.DEBUG_MODE === "true") {
//     console.error(error);
//   }
// }
