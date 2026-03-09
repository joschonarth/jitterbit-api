import { prisma } from "@/lib/prisma"
import type { OrderWithItems } from "@/repositories/orders.repository"

interface MakeOrderOptions {
  orderId?: string
  value?: number
  creationDate?: Date
  items?: {
    productId: number
    quantity: number
    price: number
  }[]
}

export async function makeOrder(
  options: MakeOrderOptions = {}
): Promise<OrderWithItems> {
  const order = await prisma.order.create({
    data: {
      orderId: options.orderId ?? `order-${crypto.randomUUID()}`,
      value: options.value ?? 1000,
      creationDate: options.creationDate ?? new Date(),
      items: {
        create: options.items ?? [
          {
            productId: 1,
            quantity: 1,
            price: 1000,
          },
        ],
      },
    },
    include: { items: true },
  })

  return order
}
