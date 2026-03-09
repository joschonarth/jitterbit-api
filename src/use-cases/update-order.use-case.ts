import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import type {
  OrdersRepository,
  OrderWithItems,
} from "@/repositories/orders.repository"

interface UpdateOrderUseCaseRequest {
  orderId: string
  value?: number
  creationDate?: Date
  items?: {
    productId: number
    quantity: number
    price: number
  }[]
}

interface UpdateOrderUseCaseResponse {
  order: OrderWithItems
}

export class UpdateOrderUseCase {
  private readonly ordersRepository: OrdersRepository

  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({
    orderId,
    value,
    creationDate,
    items,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
    const exists = await this.ordersRepository.findById(orderId)

    if (!exists) {
      throw new ResourceNotFoundError()
    }

    const order = await this.ordersRepository.update(orderId, {
      value,
      creationDate,
      items: items && {
        deleteMany: {},
        create: items,
      },
    })

    return { order }
  }
}
