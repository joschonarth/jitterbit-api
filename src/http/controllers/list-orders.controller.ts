import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeListOrdersUseCase } from "@/use-cases/factories/make-list-orders.use-case"

export async function listOrdersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listOrdersQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(10),
  })

  const { page, pageSize } = listOrdersQuerySchema.parse(request.query)

  const listOrdersUseCase = makeListOrdersUseCase()

  const { orders, meta } = await listOrdersUseCase.execute({ page, pageSize })

  return reply.status(200).send({ orders, meta })
}
