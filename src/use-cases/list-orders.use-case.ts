import type {
  OrdersRepository,
  OrderWithItems,
} from "@/repositories/orders.repository"

interface ListOrdersUseCaseRequest {
  page: number
  pageSize: number
}

interface ListOrdersUseCaseResponse {
  orders: OrderWithItems[]
  meta: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

export class ListOrdersUseCase {
  private readonly ordersRepository: OrdersRepository

  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({
    page,
    pageSize,
  }: ListOrdersUseCaseRequest): Promise<ListOrdersUseCaseResponse> {
    const { orders, total } = await this.ordersRepository.findMany({
      page,
      pageSize,
    })

    return {
      orders,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    }
  }
}
