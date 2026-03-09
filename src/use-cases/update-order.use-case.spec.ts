import { describe, expect, it } from "vitest"
import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders.repository"
import { makeOrder } from "../../tests/factories/make-order"
import { UpdateOrderUseCase } from "./update-order.use-case"

const makeUpdateOrderUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository()
  return new UpdateOrderUseCase(ordersRepository)
}

describe("update order", () => {
  it("should be able to update an order value", async () => {
    const order = await makeOrder({ value: 1000 })
    const sut = makeUpdateOrderUseCase()

    const result = await sut.execute({
      orderId: order.orderId,
      value: 5000,
    })

    expect(result.order.value).toBe(5000)
  })

  it("should be able to update order items", async () => {
    const order = await makeOrder({
      items: [{ productId: 1, quantity: 1, price: 1000 }],
    })

    const sut = makeUpdateOrderUseCase()

    const result = await sut.execute({
      orderId: order.orderId,
      items: [
        { productId: 2, quantity: 3, price: 2000 },
        { productId: 3, quantity: 1, price: 500 },
      ],
    })

    expect(result.order.items).toHaveLength(2)
    expect(result.order.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ productId: 2, quantity: 3, price: 2000 }),
        expect.objectContaining({ productId: 3, quantity: 1, price: 500 }),
      ])
    )
  })

  it("should replace all items when updating", async () => {
    const order = await makeOrder({
      items: [
        { productId: 1, quantity: 1, price: 1000 },
        { productId: 2, quantity: 2, price: 2000 },
      ],
    })

    const sut = makeUpdateOrderUseCase()

    const result = await sut.execute({
      orderId: order.orderId,
      items: [{ productId: 9, quantity: 1, price: 500 }],
    })

    expect(result.order.items).toHaveLength(1)
    expect(result.order.items[0].productId).toBe(9)
  })

  it("should not be able to update an order that does not exist", async () => {
    const sut = makeUpdateOrderUseCase()

    await expect(
      sut.execute({ orderId: "non-existing-order-id", value: 5000 })
    ).rejects.toThrow()
  })
})
