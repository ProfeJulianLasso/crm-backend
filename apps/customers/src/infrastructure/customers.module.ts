import { Module } from '@nestjs/common';
import { CustomersController } from './api/customers.controller';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
