import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { updateOrderController } from "../controllers/update-order.controller"

export const updateOrderRoute: FastifyPluginCallbackZod = (app) => {
  app.put(
    "/order/:orderId",
    {
      schema: {
        summary: "Update order",
        operationId: "updateOrder",
        tags: ["orders"],

        params: z.object({
          orderId: z.string(),
        }),

        body: z.object({
          valorTotal: z.number().optional(),
          dataCriacao: z.coerce.date().optional(),
          items: z
            .array(
              z.object({
                idItem: z.string(),
                quantidadeItem: z.number(),
                valorItem: z.number(),
              })
            )
            .optional(),
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
            code: z.string(),
          }),
        },
      },
    },
    updateOrderController
  )
}
