export enum ErrorCode {
  INVALID_SIGNATURE = 'line/invalid-signature',
}

export const ErrorMessages: Record<
  ErrorCode,
  { message: string; status: number }
> = {
  [ErrorCode.INVALID_SIGNATURE]: {
    message: 'Invalid signature',
    status: 401,
  },
}

export class AppError extends Error {
  public status: number
  public code: ErrorCode

  constructor(code: ErrorCode) {
    const { message, status } = ErrorMessages[code]

    super(message)
    this.status = status
    this.code = code
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    }
  }
}
