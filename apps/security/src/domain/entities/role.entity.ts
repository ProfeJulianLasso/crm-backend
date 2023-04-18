import {
  ValueObjectAbstract,
  ValueObjectsErrorHandlerAbstract,
} from '@sofkau/ddd';
import { Role as Roles } from '../enums';
import { RoleIdValueObject, StateValueObject } from '../value-objects';
import { NameValueObject } from '../value-objects/role';
import { Permission, PermissionType } from './permission.entity';

export type RoleType = {
  roleId: string;
  name: Roles;
  state: boolean;
  permissions?: PermissionType[];
};

export class Role<
  RoleTypeGeneric extends RoleType = RoleType,
> extends ValueObjectsErrorHandlerAbstract {
  roleId: RoleIdValueObject;
  name: NameValueObject;
  state: StateValueObject;
  permissions: Permission[];

  constructor(props?: RoleTypeGeneric) {
    super();
    this._errorMessage = 'Existen errores en los Value Objects';

    this.roleId = new RoleIdValueObject();
    if (props && props.roleId) this.roleId.value = props.roleId;

    this.name = new NameValueObject();
    if (props && props.name) this.name.value = props.name;

    this.state = new StateValueObject(true);
    if (props && props.state) this.state.value = props.state;

    this.permissions = new Array<Permission>();
    if (props && props.permissions)
      props.permissions.forEach((permission) => {
        this.permissions.push(new Permission(permission));
      });

    this.validateValueObjects(
      this._errorMessage,
      this.createArrayFromValueObjects(),
    );
  }

  changeName(name: Roles): void {
    this.name.value = name.toString();
  }

  changeState(state: boolean): void {
    this.state.value = state;
  }

  addPermission(permission: Permission): void {
    this.permissions.push(permission);
  }

  removePermission(permissionId: string): void {
    this.permissions = this.permissions.filter(
      (permission) => permission.permissionId.valueOf() !== permissionId,
    );
  }

  toPrimitives() {
    this.validateValueObjects(
      this._errorMessage,
      this.createArrayFromValueObjects(),
    );
    return {
      roleId: this.roleId.valueOf(),
      name: this.name.valueOf(),
      state: this.state.valueOf(),
      permissions: this.permissions.map((permission) =>
        permission.toPrimitives(),
      ),
    };
  }

  createArrayFromValueObjects(): Array<ValueObjectAbstract<any>> {
    const result = new Array<ValueObjectAbstract<any>>();

    if (this.roleId.hasValue()) result.push(this.roleId);

    if (this.name.hasValue()) result.push(this.name);

    if (this.state.hasValue()) result.push(this.state);

    if (this.permissions.length > 0) {
      this.permissions.forEach((permission) => {
        result.push(...permission.createArrayFromValueObjects());
      });
    }

    return result;
  }
}
