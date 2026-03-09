import { describe, expect, it } from "vitest"
import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders.repository"
import { makeOrder } from "../../tests/factories/make-order"
import { GetOrderUseCase } from "./get-order.use-case"

const makeGetOrderUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository()
  return new GetOrderUseCase(ordersRepository)
}

describe("get order", () => {
  it("should be able to get an order by id", async () => {
    const order = await makeOrder()
    const sut = makeGetOrderUseCase()

    const result = await sut.execute({ orderId: order.orderId })

    expect(result).toEqual({
      order: expect.objectContaining({
        orderId: order.orderId,
        value: order.value,
      }),
    })
  })

  it("should be able to get an order with its items", async () => {
    const order = await makeOrder({
      items: [
        { productId: 2434, quantity: 1, price: 1000 },
        { productId: 5678, quantity: 2, price: 2000 },
      ],
    })

    const sut = makeGetOrderUseCase()

    const result = await sut.execute({ orderId: order.orderId })

    expect(result.order.items).toHaveLength(2)
    expect(result.order.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ productId: 2434, quantity: 1, price: 1000 }),
        expect.objectContaining({ productId: 5678, quantity: 2, price: 2000 }),
      ])
    )
  })

  it("should not be able to get an order that does not exist", async () => {
    const sut = makeGetOrderUseCase()

    await expect(
      sut.execute({ orderId: "non-existing-order-id" })
    ).rejects.toThrow()
  })
})
