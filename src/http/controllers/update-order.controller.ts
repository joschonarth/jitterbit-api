import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeUpdateOrderUseCase } from "@/use-cases/factories/make-update-order.use-case"

export async function updateOrderController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateOrderParamsSchema = z.object({
    orderId: z.string(),
  })

  const updateOrderBodySchema = z.object({
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
  })

  const { orderId } = updateOrderParamsSchema.parse(request.params)
  const { valorTotal, dataCriacao, items } = updateOrderBodySchema.parse(
    request.body
  )

  const updateOrderUseCase = makeUpdateOrderUseCase()

  const { order } = await updateOrderUseCase.execute({
    orderId,
    value: valorTotal,
    creationDate: dataCriacao,
    items: items?.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  })

  return reply.status(200).send({ order })
}
