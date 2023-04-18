import {
  ValueObjectAbstract,
  ValueObjectsErrorHandlerAbstract,
} from '@sofkau/ddd';
import { CustomerPermissions, RolePermissions } from '../enums';
import { PermissionIdValueObject, StateValueObject } from '../value-objects';
import { NameValueObject } from '../value-objects/permission';

export type PermissionType = {
  permissionId: string;
  name: CustomerPermissions | RolePermissions;
  state: boolean;
};

export class Permission<
  PermissionTypeGeneric extends PermissionType = PermissionType,
> extends ValueObjectsErrorHandlerAbstract {
  permissionId: PermissionIdValueObject;
  name: NameValueObject;
  state: StateValueObject;

  constructor(props?: PermissionTypeGeneric) {
    super();
    this._errorMessage = 'Existen errores en los Objectos de Valor';

    this.permissionId = new PermissionIdValueObject();
    if (props && props.permissionId)
      this.permissionId.value = props.permissionId;

    this.name = new NameValueObject();
    if (props && props.name) this.name.value = props.name;

    this.state = new StateValueObject(true);
    if (props && (props.state === false || props.state === true))
      this.state.value = props.state;

    this.validateValueObjects(
      this._errorMessage,
      this.createArrayFromValueObjects(),
    );
  }

  changeName(name: CustomerPermissions | RolePermissions): void {
    this.name.value = name.toString();
  }

  changeState(state: boolean): void {
    this.state.value = state;
  }

  createArrayFromValueObjects(): Array<ValueObjectAbstract<any>> {
    const result = new Array<ValueObjectAbstract<any>>();
    if (this.permissionId.hasValue()) result.push(this.permissionId);
    if (this.name.hasValue()) result.push(this.name);
    if (this.state.hasValue()) result.push(this.state);
    return result;
  }

  toPrimitives(): PermissionTypeGeneric {
    this.validateValueObjects(
      this._errorMessage,
      this.createArrayFromValueObjects(),
    );
    return {
      permissionId: this.permissionId.valueOf(),
      name: this.name.valueOf(),
      state: this.state.valueOf(),
    } as PermissionTypeGeneric;
  }
}
