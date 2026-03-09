import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeDeleteOrderUseCase } from "@/use-cases/factories/make-delete-order.use-case"

export async function deleteOrderController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteOrderParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = deleteOrderParamsSchema.parse(request.params)

  const deleteOrderUseCase = makeDeleteOrderUseCase()

  await deleteOrderUseCase.execute({ orderId })

  return reply.status(204).send()
}
