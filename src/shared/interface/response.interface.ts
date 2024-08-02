import { HttpStatus } from '@nestjs/common'

export interface ResponseInterface {
  status: ResponseStatus
  data?: any
}

export class ResponseStatus {
  code: number
  message: any
  header: string
  constructor(fields?: Partial<ResponseStatus>) {
    if (fields) {
      Object.assign(this, fields)
    }
  }
}

export class ResponseSuccessStatus extends ResponseStatus {
  code: HttpStatus = HttpStatus.OK
  message = 'Get information successfully'
  header: string
}

export class ResponseSuccess implements ResponseInterface {
  status = new ResponseSuccessStatus()
  data = {}
  constructor(fields?: Partial<ResponseSuccess>) {
    if (fields) {
      Object.assign(this, fields)
    }
  }
}