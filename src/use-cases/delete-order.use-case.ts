import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import type { OrdersRepository } from "@/repositories/orders.repository"

interface DeleteOrderUseCaseRequest {
  orderId: string
}

export class DeleteOrderUseCase {
  private readonly ordersRepository: OrdersRepository

  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({ orderId }: DeleteOrderUseCaseRequest): Promise<void> {
    const exists = await this.ordersRepository.findById(orderId)

    if (!exists) {
      throw new ResourceNotFoundError()
    }

    await this.ordersRepository.delete(orderId)
  }
}
