import { describe, expect, it } from "vitest"
import { prisma } from "@/lib/prisma"
import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders.repository"
import { CreateOrderUseCase } from "./create-order.use-case"

const makeCreateOrderUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository()
  return new CreateOrderUseCase(ordersRepository)
}

describe("create order", () => {
  it("should be able to create an order", async () => {
    const sut = makeCreateOrderUseCase()

    const result = await sut.execute({
      orderId: `order-${crypto.randomUUID()}`,
      value: 10_000,
      creationDate: new Date("2023-07-19T12:24:11.529Z"),
      items: [
        { productId: 2434, quantity: 1, price: 1000 },
        { productId: 5678, quantity: 2, price: 2000 },
      ],
    })

    expect(result).toEqual({
      order: expect.objectContaining({
        value: 10_000,
      }),
    })
  })

  it("should be able to create an order with items", async () => {
    const sut = makeCreateOrderUseCase()

    const result = await sut.execute({
      orderId: `order-${crypto.randomUUID()}`,
      value: 5000,
      creationDate: new Date(),
      items: [
        { productId: 1111, quantity: 3, price: 500 },
        { productId: 2222, quantity: 1, price: 250 },
      ],
    })

    expect(result.order.items).toHaveLength(2)
    expect(result.order.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ productId: 1111, quantity: 3, price: 500 }),
        expect.objectContaining({ productId: 2222, quantity: 1, price: 250 }),
      ])
    )
  })

  it("should persist the order in the database", async () => {
    const sut = makeCreateOrderUseCase()
    const orderId = `order-${crypto.randomUUID()}`

    await sut.execute({
      orderId,
      value: 3000,
      creationDate: new Date(),
      items: [{ productId: 9999, quantity: 1, price: 3000 }],
    })

    const orderOnDb = await prisma.order.findUnique({
      where: { orderId },
      include: { items: true },
    })

    expect(orderOnDb).not.toBeNull()
    expect(orderOnDb?.items).toHaveLength(1)
  })
})
