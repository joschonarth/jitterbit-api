import { describe, expect, it } from "vitest"
import { prisma } from "@/lib/prisma"
import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders.repository"
import { makeOrder } from "../../tests/factories/make-order"
import { DeleteOrderUseCase } from "./delete-order.use-case"

const makeDeleteOrderUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository()
  return new DeleteOrderUseCase(ordersRepository)
}

describe("delete order", () => {
  it("should be able to delete an order", async () => {
    const order = await makeOrder()
    const sut = makeDeleteOrderUseCase()

    await sut.execute({ orderId: order.orderId })

    const orderOnDb = await prisma.order.findUnique({
      where: { orderId: order.orderId },
    })

    expect(orderOnDb).toBeNull()
  })

  it("should delete all items when deleting an order", async () => {
    const order = await makeOrder({
      items: [
        { productId: 1, quantity: 1, price: 1000 },
        { productId: 2, quantity: 2, price: 2000 },
      ],
    })

    const sut = makeDeleteOrderUseCase()

    await sut.execute({ orderId: order.orderId })

    const itemsOnDb = await prisma.item.findMany({
      where: { orderId: order.orderId },
    })

    expect(itemsOnDb).toHaveLength(0)
  })

  it("should not be able to delete an order that does not exist", async () => {
    const sut = makeDeleteOrderUseCase()

    await expect(
      sut.execute({ orderId: "non-existing-order-id" })
    ).rejects.toThrow()
  })
})
