import type { Prisma } from "generated/prisma/client"
import { prisma } from "@/lib/prisma"
import type { OrdersRepository, OrderWithItems } from "../orders.repository"

export class PrismaOrdersRepository implements OrdersRepository {
  async create(data: Prisma.OrderCreateInput): Promise<OrderWithItems> {
    const order = await prisma.order.create({
      data,
      include: { items: true },
    })

    return order
  }

  async findById(orderId: string): Promise<OrderWithItems | null> {
    const order = await prisma.order.findUnique({
      where: { orderId },
      include: { items: true },
    })

    return order
  }
}
