import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValueObjectException } from '@sofkau/ddd';
import { Response } from 'express';

@Catch(ValueObjectException)
export class ValueObjectExceptionFilter
  implements ExceptionFilter<ValueObjectException>
{
  catch(exception: ValueObjectException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.BAD_REQUEST;
    const error = exception.errors;

    response.status(statusCode).json({ statusCode, message, error });
  }
}
