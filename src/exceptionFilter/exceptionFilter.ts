import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLogger } from 'src/logger/logger.service';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    this.logger.error(
      `[${request.method}] ${request.url} - ${status} ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    process
      .on('uncaughtException', (err) => {
        this.logger.error('Uncaught Exception:', err.stack);
        process.exit(1);
      })
      .on('unhandledRejection', (reason, promise) => {
        const message = `Unhandled Rejection at: ${promise}. Reason: ${reason}`;
        this.logger.error(message);
        process.exit(1);
      });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
