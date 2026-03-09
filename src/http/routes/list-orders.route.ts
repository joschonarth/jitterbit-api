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
        description:
          "Returns a paginated list of all orders with their items. Use `page` and `pageSize` query params to control pagination.",
        tags: ["orders"],

        querystring: z.object({
          page: z.coerce.number().int().positive().default(1),
          pageSize: z.coerce.number().int().positive().max(100).default(10),
        }),

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
            meta: z.object({
              total: z.number(),
              page: z.number(),
              pageSize: z.number(),
              totalPages: z.number(),
            }),
          }),
        },
      },
    },
    listOrdersController
  )
}
