import { Permission, Role, User } from '../entities';
import { CustomerPermissions, Role as Roles, RolePermissions } from '../enums';

export class UserAggregateRoot {
  changePermissionName(
    name: CustomerPermissions | RolePermissions,
    permission: Permission,
  ): Permission {
    permission.changeName(name);
    return permission;
  }

  changePermissionState(state: boolean, permission: Permission): Permission {
    permission.changeState(state);
    return permission;
  }

  changeRoleName(name: Roles, role: Role): Role {
    role.changeName(name);
    return role;
  }

  changeRoleState(state: boolean, role: Role): Role {
    role.changeState(state);
    return role;
  }

  addPermissionToRole(permission: Permission, role: Role): Role {
    role.addPermission(permission);
    return role;
  }

  removePermissionFromRole(permission: Permission, role: Role): Role {
    role.removePermission(permission.permissionId.valueOf());
    return role;
  }

  changeUserEmail(email: string, user: User): User {
    user.changeEmail(email);
    return user;
  }

  changeUserPassword(password: string, user: User): User {
    user.changePassword(password);
    return user;
  }

  changeUserState(state: boolean, user: User): User {
    user.changeState(state);
    return user;
  }

  changeUserRole(role: Role, user: User): User {
    user.changeRole(role);
    return user;
  }
}
