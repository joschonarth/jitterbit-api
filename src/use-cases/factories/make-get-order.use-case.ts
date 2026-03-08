import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders.repository"
import { GetOrderUseCase } from "../get-order.use-case"

export function makeGetOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const getOrderUseCase = new GetOrderUseCase(ordersRepository)

  return getOrderUseCase
}
