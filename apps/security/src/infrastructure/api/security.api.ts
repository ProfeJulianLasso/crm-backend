import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UseCaseDelegate } from '../../application';
import { PermissionType } from '../../domain/entities';
import { CreatePermissionCommand } from '../../domain/interfaces';
import { PermissionRepository } from '../persistence';

@Controller()
export class SecurityAPI {
  private readonly useCaseDelegate: UseCaseDelegate;

  constructor(private readonly permissionRepository: PermissionRepository) {
    this.useCaseDelegate = new UseCaseDelegate(this.permissionRepository);
  }

  @Post()
  createPermission(
    @Body() permission: CreatePermissionCommand,
  ): Observable<PermissionType> {
    return this.useCaseDelegate
      .toCreatePermission()
      .execute<PermissionType>(permission);
  }
}
