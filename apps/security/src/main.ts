import { NestFactory } from '@nestjs/core';
import { SecurityModule } from './infrastructure/security.module';

async function bootstrap() {
  const app = await NestFactory.create(SecurityModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  await app.listen(3001);
  console.log(`🚀 Application is running on: ${await app.getUrl()} - Security`);
}
bootstrap();
