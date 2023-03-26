import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './infrastructure/customers.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomersModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  await app.listen(3002);
  console.log(
    `🚀 Application is running on: ${await app.getUrl()} - Customers`,
  );
}
bootstrap();
