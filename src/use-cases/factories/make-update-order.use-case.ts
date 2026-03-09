import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders.repository"
import { UpdateOrderUseCase } from "../update-order.use-case"

export function makeUpdateOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const updateOrderUseCase = new UpdateOrderUseCase(ordersRepository)

  return updateOrderUseCase
}
