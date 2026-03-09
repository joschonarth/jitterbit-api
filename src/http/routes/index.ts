import type { FastifyInstance } from "fastify"
import { createOrderRoute } from "./create-order.route"
import { deleteOrderRoute } from "./delete-order.route"
import { getOrderRoute } from "./get-order.route"
import { listOrdersRoute } from "./list-orders.route"
import { updateOrderRoute } from "./update-order.route"

export function appRoutes(app: FastifyInstance) {
  app.register(createOrderRoute)
  app.register(getOrderRoute)
  app.register(listOrdersRoute)
  app.register(updateOrderRoute)
  app.register(deleteOrderRoute)
}
