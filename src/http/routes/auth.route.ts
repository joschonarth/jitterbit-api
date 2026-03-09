import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { authController } from "../controllers/auth.controller"

export const authRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/auth",
    {
      schema: {
        summary: "Authenticate",
        description:
          "Authenticates with static credentials and returns a JWT token.",
        operationId: "authenticate",
        tags: ["auth"],

        body: z.object({
          username: z.string(),
          password: z.string(),
        }),

        response: {
          200: z.object({
            token: z.string(),
          }),
          401: z.object({
            message: z.string(),
            code: z.string(),
          }),
        },
      },
    },
    authController
  )
}
