import { ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export const ExceptionHandler = (
  error: QueryFailedError | ConflictException,
) => {
  if (error instanceof QueryFailedError && error.driverError.code === '23505')
    throw new ConflictException('Permission already exists');
  else throw new ConflictException(error.message);
};
