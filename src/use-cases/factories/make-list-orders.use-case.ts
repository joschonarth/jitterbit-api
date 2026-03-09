import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders.repository"
import { ListOrdersUseCase } from "../list-orders.use-case"

export function makeListOrdersUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const listOrdersUseCase = new ListOrdersUseCase(ordersRepository)

  return listOrdersUseCase
}
