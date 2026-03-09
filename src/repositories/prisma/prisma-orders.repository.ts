import type { Prisma } from "generated/prisma/client"
import { prisma } from "@/lib/prisma"
import type {
  FindManyParams,
  FindManyResult,
  OrdersRepository,
  OrderWithItems,
} from "../orders.repository"

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

  async findMany({ page, pageSize }: FindManyParams): Promise<FindManyResult> {
    const [orders, total] = await prisma.$transaction([
      prisma.order.findMany({
        include: { items: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { creationDate: "desc" },
      }),
      prisma.order.count(),
    ])

    return { orders, total }
  }

  async update(
    orderId: string,
    data: Prisma.OrderUpdateInput
  ): Promise<OrderWithItems> {
    const order = await prisma.order.update({
      where: { orderId },
      data,
      include: { items: true },
    })

    return order
  }

  async delete(orderId: string): Promise<void> {
    await prisma.order.delete({
      where: { orderId },
    })
  }
}
