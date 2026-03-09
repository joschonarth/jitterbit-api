import type { FastifyInstance } from "fastify"
import { authenticate } from "../middlewares/authenticate"
import { authRoute } from "./auth.route"
import { createOrderRoute } from "./create-order.route"
import { deleteOrderRoute } from "./delete-order.route"
import { getOrderRoute } from "./get-order.route"
import { listOrdersRoute } from "./list-orders.route"
import { updateOrderRoute } from "./update-order.route"

export function appRoutes(app: FastifyInstance) {
  app.register(authRoute)

  app.register((protectedApp) => {
    protectedApp.addHook("onRequest", authenticate)

    protectedApp.register(createOrderRoute)
    protectedApp.register(getOrderRoute)
    protectedApp.register(listOrdersRoute)
    protectedApp.register(updateOrderRoute)
    protectedApp.register(deleteOrderRoute)
  })
}
