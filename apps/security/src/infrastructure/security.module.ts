import { Module } from '@nestjs/common';
import { SecurityController } from './api/security.controller';
import { SecurityService } from './services/security.service';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
