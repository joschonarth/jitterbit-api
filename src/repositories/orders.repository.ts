import type { Item, Order, Prisma } from "generated/prisma/client"

export type OrderWithItems = Order & { items: Item[] }

export interface FindManyParams {
  page: number
  pageSize: number
}

export interface FindManyResult {
  orders: OrderWithItems[]
  total: number
}

export interface OrdersRepository {
  create(data: Prisma.OrderCreateInput): Promise<OrderWithItems>
  findById(orderId: string): Promise<OrderWithItems | null>
  findMany(params: FindManyParams): Promise<FindManyResult>
  update(
    orderId: string,
    data: Prisma.OrderUpdateInput
  ): Promise<OrderWithItems>
  delete(orderId: string): Promise<void>
}
