import { PermissionType } from 'apps/security/src/domain/entities';
import {
  CustomerPermissions,
  RolePermissions,
} from 'apps/security/src/domain/enums';
import { Column, Entity } from 'typeorm';

@Entity('permissions')
export class PermissionPostgresEntity implements PermissionType {
  @Column('uuid', {
    primary: true,
    name: 'permission_id',
    default: () => 'uuid_generate_v4()',
  })
  permissionId: string;

  @Column('character varying', { name: 'username', length: 50, unique: true })
  name: CustomerPermissions | RolePermissions;

  @Column('boolean', { name: 'state', default: () => 'true' })
  state: boolean;
}
