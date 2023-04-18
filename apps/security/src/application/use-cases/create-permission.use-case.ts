import { IUseCase } from '@sofkau/ddd';
import { map, Observable } from 'rxjs';
import { Permission } from '../../domain/entities';
import { CustomerPermissions, RolePermissions } from '../../domain/enums';
import {
  CreatePermissionCommand,
  CreatePermissionResponse,
} from '../../domain/interfaces';
import { IPermissionRepository } from '../../domain/repositories';

export class CreatePermissionUseCase
  implements IUseCase<CreatePermissionCommand, CreatePermissionResponse>
{
  constructor(private readonly repository: IPermissionRepository) {}

  execute(
    command: CreatePermissionCommand,
  ): Observable<CreatePermissionResponse> {
    const permission = new Permission({
      permissionId: command.permissionId,
      name: command.name as CustomerPermissions | RolePermissions,
      state: command.state,
    });

    return this.repository.save(permission.toPrimitives()).pipe(
      map((permission) => {
        return { data: permission } as CreatePermissionResponse;
      }),
    );
  }
}
