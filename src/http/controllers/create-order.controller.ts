import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateOrderUseCase } from "@/use-cases/factories/make-create-order.use-case"

export async function createOrderController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrderBodySchema = z.object({
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
  })

  const { numeroPedido, valorTotal, dataCriacao, items } =
    createOrderBodySchema.parse(request.body)

  const createOrderUseCase = makeCreateOrderUseCase()

  const { order } = await createOrderUseCase.execute({
    orderId: numeroPedido,
    value: valorTotal,
    creationDate: dataCriacao,
    items: items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  })

  return reply.status(201).send({ order })
}
