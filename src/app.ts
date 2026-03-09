import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"
import z, { ZodError } from "zod"
import { env } from "./env"
import { AppError } from "./errors/app-error"
import { appRoutes } from "./http/routes"
import { jwtConfig } from "./plugins/jwt"
import { swaggerConfig } from "./plugins/swagger"

export const app = fastify({
  logger: {
    level: env.NODE_ENV === "production" ? "info" : "warn",
  },
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

swaggerConfig(app)
jwtConfig(app)

app.get("/health", () => {
  return "OK"
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
      code: error.code,
    })
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: z.treeifyError(error) })
  }

  if (env.NODE_ENV !== "production") {
    console.error(error)
  }

  return reply.status(500).send({ message: "Internal server error." })
})
