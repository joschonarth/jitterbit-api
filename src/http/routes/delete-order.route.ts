import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { deleteOrderController } from "../controllers/delete-order.controller"

export const deleteOrderRoute: FastifyPluginCallbackZod = (app) => {
  app.delete(
    "/order/:orderId",
    {
      schema: {
        summary: "Delete order",
        operationId: "deleteOrder",
        tags: ["orders"],

        params: z.object({
          orderId: z.string(),
        }),

        response: {
          204: z.void(),
          404: z.object({
            message: z.string(),
            code: z.string(),
          }),
        },
      },
    },
    deleteOrderController
  )
}
