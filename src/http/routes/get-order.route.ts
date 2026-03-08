import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { getOrderController } from "../controllers/get-order.controller"

export const getOrderRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/order/:orderId",
    {
      schema: {
        summary: "Get order",
        operationId: "getOrder",
        tags: ["orders"],

        params: z.object({
          orderId: z.string(),
        }),

        response: {
          200: z.object({
            order: z.object({
              orderId: z.string(),
              value: z.number(),
              creationDate: z.coerce.date(),
              items: z.array(
                z.object({
                  productId: z.number(),
                  quantity: z.number(),
                  price: z.number(),
                })
              ),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    getOrderController
  )
}
