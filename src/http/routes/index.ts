import type { FastifyInstance } from "fastify"
import { createOrderRoute } from "./create-order.route"
import { getOrderRoute } from "./get-order.route"
import { listOrdersRoute } from "./list-orders.route"

export function appRoutes(app: FastifyInstance) {
  app.register(createOrderRoute)
  app.register(getOrderRoute)
  app.register(listOrdersRoute)
}
