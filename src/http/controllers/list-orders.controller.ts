import type { FastifyReply, FastifyRequest } from "fastify"
import { makeListOrdersUseCase } from "@/use-cases/factories/make-list-orders.use-case"

export async function listOrdersController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const listOrdersUseCase = makeListOrdersUseCase()

  const { orders } = await listOrdersUseCase.execute()

  return reply.status(200).send({ orders })
}
