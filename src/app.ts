import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"
import z, { ZodError } from "zod"
import { env } from "./env"

export const app = fastify({
  logger: {
    level: env.NODE_ENV === "production" ? "info" : "debug",
  },
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.get("/health", () => {
  return "OK"
})

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: z.treeifyError(error) })
  }

  request.log.error(error)

  return reply.status(500).send({ message: "Internal server error." })
})
