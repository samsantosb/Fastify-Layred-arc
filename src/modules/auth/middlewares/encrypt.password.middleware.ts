import { FastifyRequest, FastifyReply } from "fastify";
import { encryptPassword } from "../services/auth.service";
import { statusCode } from "../../../shared/statusCode/status-code";
import { z } from "zod";

export const encryptPasswordMiddleware = async (
  request: FastifyRequest<{ Body: { password: string } }>,
  reply: FastifyReply
) => {
  try {
    const {
      body: { password },
    } = request;

    const parsedPassword = z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .parse(password);

    if (!password) {
      return reply.status(statusCode.BAD_REQUEST).send({
        message: "Password is required",
      });
    }

    request.body.password = await encryptPassword(parsedPassword);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handlePassowrdZodError(error, reply);
    }

    return reply.status(statusCode.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
    });
  }
};

function handlePassowrdZodError(error: z.ZodError, reply: FastifyReply) {
  return reply.status(statusCode.BAD_REQUEST).send({
    message: error.errors[0].message,
  });
}
