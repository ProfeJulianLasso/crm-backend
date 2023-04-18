import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionPostgresConfig } from './configs';
import { PermissionPostgresEntity } from './entities';
import { PermissionPostgresRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: ConnectionPostgresConfig,
    }),
    TypeOrmModule.forFeature([PermissionPostgresEntity]),
  ],
  providers: [ConnectionPostgresConfig, PermissionPostgresRepository],
  exports: [
    TypeOrmModule,
    ConnectionPostgresConfig,
    PermissionPostgresRepository,
  ],
})
export class PostgresModule {}
