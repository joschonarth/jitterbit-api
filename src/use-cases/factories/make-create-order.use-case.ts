import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders.repository"
import { CreateOrderUseCase } from "../create-order.use-case"

export function makeCreateOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const createOrderUseCase = new CreateOrderUseCase(ordersRepository)

  return createOrderUseCase
}
