import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { listOrdersController } from "../controllers/list-orders.controller"

export const listOrdersRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/order/list",
    {
      schema: {
        summary: "List orders",
        operationId: "listOrders",
        tags: ["orders"],

        response: {
          200: z.object({
            orders: z.array(
              z.object({
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
              })
            ),
          }),
        },
      },
    },
    listOrdersController
  )
}
