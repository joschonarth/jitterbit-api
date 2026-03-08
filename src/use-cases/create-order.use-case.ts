import type {
  OrdersRepository,
  OrderWithItems,
} from "@/repositories/orders.repository"

interface CreateOrderUseCaseRequest {
  orderId: string
  value: number
  creationDate: Date
  items: {
    productId: number
    quantity: number
    price: number
  }[]
}
interface CreateOrderUseCaseResponse {
  order: OrderWithItems
}

export class CreateOrderUseCase {
  private readonly ordersRepository: OrdersRepository

  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({
    orderId,
    value,
    creationDate,
    items,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = await this.ordersRepository.create({
      orderId,
      value,
      creationDate,
      items: {
        create: items,
      },
    })

    return { order }
  }
}
