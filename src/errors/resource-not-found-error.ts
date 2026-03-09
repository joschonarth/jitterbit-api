import { AppError } from "./app-error"

export class ResourceNotFoundError extends AppError {
  constructor() {
    super({
      message: "Resource not found",
      statusCode: 404,
      code: "RESOURCE_NOT_FOUND",
    })
  }
}
