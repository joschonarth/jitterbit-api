import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { env } from "@/env"

export async function authController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = authBodySchema.parse(request.body)

  if (username !== env.API_USERNAME || password !== env.API_PASSWORD) {
    return reply.status(401).send({
      message: "Invalid credentials.",
      code: "INVALID_CREDENTIALS",
    })
  }

  const token = await reply.jwtSign({ username }, { expiresIn: "1d" })

  return reply.status(200).send({ token })
}
