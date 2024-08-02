import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { defaultTo } from 'lodash'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, headers } = request
    const userAgent = request.get('user-agent') || ''
    response.on('finish', () => {
      const { statusCode } = response
      const contentLength = response.get('content-length')

      this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`)

      if (!defaultTo(headers['content-type'], '').toLowerCase().includes('multipart/form-data')) {
        this.logger.log(`REQUEST BODY ${JSON.stringify(request.body)}`)
      }

      if (statusCode !== HttpStatus.OK) {
        this.logger.log(
          JSON.stringify({
            PATH: request.originalUrl,
            HEADERS: request.headers,
            QUERIES: request.query,
            BODY: request.body,
            STATUS_CODE: statusCode,
          }),
        )
      }

      this.logger.log(contentLength, 'Log Content')
    })

    next()
  }
}
