import type { FastifyInstance } from "fastify"
import { createOrderRoute } from "./create-order.route"

export async function appRoutes(app: FastifyInstance) {
  await app.register(createOrderRoute)
}
