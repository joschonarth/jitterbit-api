import { describe, expect, it } from "vitest"
import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders.repository"
import { makeOrder } from "../../tests/factories/make-order"
import { ListOrdersUseCase } from "./list-orders.use-case"

const makeListOrdersUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository()
  return new ListOrdersUseCase(ordersRepository)
}

describe("list orders", () => {
  it("should be able to list orders", async () => {
    await makeOrder()
    await makeOrder()

    const sut = makeListOrdersUseCase()

    const result = await sut.execute({ page: 1, pageSize: 10 })

    expect(result.orders.length).toBeGreaterThanOrEqual(2)
  })

  it("should return correct meta information", async () => {
    await makeOrder()

    const sut = makeListOrdersUseCase()

    const result = await sut.execute({ page: 1, pageSize: 10 })

    expect(result.meta).toEqual(
      expect.objectContaining({
        page: 1,
        pageSize: 10,
        total: expect.any(Number),
        totalPages: expect.any(Number),
      })
    )
  })

  it("should be able to paginate orders", async () => {
    await makeOrder()
    await makeOrder()
    await makeOrder()

    const sut = makeListOrdersUseCase()

    const firstPage = await sut.execute({ page: 1, pageSize: 2 })
    const secondPage = await sut.execute({ page: 2, pageSize: 2 })

    expect(firstPage.orders).toHaveLength(2)
    expect(secondPage.orders.length).toBeGreaterThanOrEqual(1)
  })

  it("should return orders with their items", async () => {
    await makeOrder({
      items: [
        { productId: 1, quantity: 1, price: 1000 },
        { productId: 2, quantity: 2, price: 2000 },
      ],
    })

    const sut = makeListOrdersUseCase()

    const result = await sut.execute({ page: 1, pageSize: 10 })

    expect(result.orders[0].items).toBeDefined()
  })
})
