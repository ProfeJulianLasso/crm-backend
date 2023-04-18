import { IUseCase } from '@sofkau/ddd';
import { Observable, map } from 'rxjs';
import { Permission } from '../../domain/entities';
import { CustomerPermissions, RolePermissions } from '../../domain/enums';
import {
  UpdateNamePermissionCommand,
  UpdateNamePermissionResponse,
} from '../../domain/interfaces';
import { IPermissionRepository } from '../../domain/repositories';

export class UpdateNamePermissionUseCase
  implements
    IUseCase<UpdateNamePermissionCommand, UpdateNamePermissionResponse>
{
  constructor(private readonly repository: IPermissionRepository) {}

  execute(
    command: UpdateNamePermissionCommand,
  ): Observable<UpdateNamePermissionResponse> {
    const permission = new Permission({
      permissionId: command.permissionId,
      name: command.name as CustomerPermissions | RolePermissions,
      state: command.state,
    });

    return this.repository
      .update(command.permissionId, permission.toPrimitives())
      .pipe(
        map((permission) => {
          return { data: permission } as UpdateNamePermissionResponse;
        }),
      );
  }
}
