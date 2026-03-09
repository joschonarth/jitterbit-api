import type {
  OrdersRepository,
  OrderWithItems,
} from "@/repositories/orders.repository"

interface ListOrdersUseCaseResponse {
  orders: OrderWithItems[]
}

export class ListOrdersUseCase {
  private readonly ordersRepository: OrdersRepository

  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute(): Promise<ListOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findMany()

    return { orders }
  }
}
