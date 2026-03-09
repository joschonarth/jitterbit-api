import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import type {
  OrdersRepository,
  OrderWithItems,
} from "@/repositories/orders.repository"

interface GetOrderUseCaseRequest {
  orderId: string
}

interface GetOrderUseCaseResponse {
  order: OrderWithItems
}

export class GetOrderUseCase {
  private readonly ordersRepository: OrdersRepository

  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({
    orderId,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return { order }
  }
}
