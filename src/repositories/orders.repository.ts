import type { Item, Order, Prisma } from "generated/prisma/client"

export type OrderWithItems = Order & { items: Item[] }

export interface OrdersRepository {
  create(data: Prisma.OrderCreateInput): Promise<OrderWithItems>
}
