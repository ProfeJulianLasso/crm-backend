import { Module } from '@nestjs/common';
import { PostgresModule } from './databases';
import { PermissionRepository } from './repositories';

@Module({
  imports: [PostgresModule],
  providers: [PermissionRepository],
  exports: [PermissionRepository],
})
export class PersistenceModule {}
