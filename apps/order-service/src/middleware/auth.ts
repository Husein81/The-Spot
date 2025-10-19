import { FastifyReply, FastifyRequest } from "fastify";
import { getAuth } from "@clerk/fastify";
import type { CustomJwtSessionClaims } from "@repo/types";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const protect = (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = getAuth(request);

  if (!userId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  request.userId = userId;
};

export const isAdmin = (request: FastifyRequest, reply: FastifyReply) => {
  const auth = getAuth(request);
  const userId = auth.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
  const sessionClaims = auth.sessionClaims as CustomJwtSessionClaims;

  if (sessionClaims.metadata?.role !== "admin")
    return reply.status(403).send({ error: "Forbidden" });

  request.userId = userId;
};
