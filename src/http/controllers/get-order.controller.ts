import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeGetOrderUseCase } from "@/use-cases/factories/make-get-order.use-case"

export async function getOrderController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getOrderParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = getOrderParamsSchema.parse(request.params)

  const getOrderUseCase = makeGetOrderUseCase()

  const { order } = await getOrderUseCase.execute({ orderId })

  return reply.status(200).send({ order })
}
