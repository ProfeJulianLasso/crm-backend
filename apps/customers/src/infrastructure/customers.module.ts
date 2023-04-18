import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { CustomersAPI } from './api/customers.api';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        'customers',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
    }),
  ],
  controllers: [CustomersAPI],
  providers: [CustomersService],
})
export class CustomersModule {}
