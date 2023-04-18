// Libraries
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { join } from 'node:path';

// API
import { SecurityAPI } from './api/security.api';

// Exception filters
import { SecurityService } from './services/security.service';

// Modules
import { MessagingModule } from './messaging/messaging.module';
import { PersistenceModule } from './persistence/persistence.module';

// Services
import { ValueObjectExceptionFilter } from './exception-filters/object-value.exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        'security',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
    }),
    MessagingModule,
    PersistenceModule,
  ],
  controllers: [SecurityAPI],
  providers: [
    SecurityService,
    { provide: APP_FILTER, useClass: ValueObjectExceptionFilter },
  ],
})
export class SecurityModule {}
