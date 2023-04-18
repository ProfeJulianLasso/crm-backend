import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PermissionPostgresEntity } from '../entities';

@Injectable()
export class ConnectionPostgresConfig {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [PermissionPostgresEntity],
      synchronize: true,
      logging: true,
    };
  }
}
