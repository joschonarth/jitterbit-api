import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { createOrderController } from "../controllers/create-order.controller"

export const createOrderRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/order",
    {
      schema: {
        summary: "Create order",
        operationId: "createOrder",
        tags: ["orders"],

        body: z.object({
          numeroPedido: z.string(),
          valorTotal: z.number(),
          dataCriacao: z.coerce.date(),
          items: z.array(
            z.object({
              idItem: z.string(),
              quantidadeItem: z.number(),
              valorItem: z.number(),
            })
          ),
        }),

        response: {
          201: z.object({
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
        },
      },
    },
    createOrderController
  )
}
