import { FastifyRequest, FastifyReply } from "fastify";
import { verifyJWT } from "../services/auth.service";
import { statusCode } from "../../../shared/statusCode/status-code";

export const authMiddleware = async (
  request: FastifyRequest<{ Headers: { authorization: string } }>,
  reply: FastifyReply,
) => {
  const {
    headers: { authorization },
  } = request;

  const invalidAuthorization =
    !authorization || !authorization.startsWith("Bearer ");

  if (invalidAuthorization) {
    reply.status(statusCode.UNAUTHORIZED).send({ error: "Unauthorized" });
    return;
  }

  const token = authorization.split(" ")[1];
  const decoded = verifyJWT(token);

  if (!decoded) {
    reply.status(statusCode.UNAUTHORIZED).send({ error: "Invalid token" });
    return;
  }
};
