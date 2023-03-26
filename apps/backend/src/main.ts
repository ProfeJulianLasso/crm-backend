import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()} - Backend`);
}
bootstrap();
