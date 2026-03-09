interface AppErrorOptions {
  message: string
  statusCode?: number
  code: string
}

export class AppError extends Error {
  readonly statusCode
  readonly code

  constructor({ message, statusCode = 400, code }: AppErrorOptions) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
  }
}
