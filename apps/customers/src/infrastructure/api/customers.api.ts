import { Controller, Get } from '@nestjs/common';
import { CustomersService } from '../services/customers.service';

@Controller()
export class CustomersAPI {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getHello(): string {
    return this.customersService.getHello();
  }
}
