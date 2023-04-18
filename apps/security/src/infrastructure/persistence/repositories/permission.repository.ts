import { Injectable } from '@nestjs/common';
import { PermissionPostgresRepository } from '../databases';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class PermissionRepository extends PermissionPostgresRepository<PermissionEntity> {}
