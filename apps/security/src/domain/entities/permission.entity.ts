import {
  ValueObjectAbstract,
  ValueObjectsErrorHandlerAbstract,
} from '@sofkau/ddd';
import { v4 as uuid } from 'uuid';
import { CustomerPermissions } from '../enums';
import {
  NameValueObject,
  PermissionIdValueObject,
  StateValueObject,
} from '../value-objects/Permission';

export interface PermissionProps {
  permissionId: string;
  name: CustomerPermissions;
  state: boolean;
}

export class Permission<
  PropsType extends PermissionProps = PermissionProps,
> extends ValueObjectsErrorHandlerAbstract {
  permissionId: PermissionIdValueObject;
  name: NameValueObject;
  state: StateValueObject;

  constructor(props?: PropsType) {
    super();
    this._errorMessage = 'Existen errores en los Value Objects';

    this.permissionId = new PermissionIdValueObject(uuid());
    if (props && props.permissionId)
      this.permissionId.value = props.permissionId;

    this.name = new NameValueObject();
    if (props && props.name) this.name.value = props.name;

    this.state = new StateValueObject(true);
    if (props && props.state) this.state.value = props.state;

    this.validateValueObjects(
      this._errorMessage,
      this.createArrayFromValueObjects(),
    );
  }

  changeName(name: CustomerPermissions): void {
    this.name.value = name.toString();
  }

  changeState(state: boolean): void {
    this.state.value = state;
  }

  toPrimitives(): PropsType {
    this.validateValueObjects(
      this._errorMessage,
      this.createArrayFromValueObjects(),
    );
    return {
      permissionId: this.permissionId.valueOf(),
      name: this.name.valueOf(),
      state: this.state.valueOf(),
    } as PropsType;
  }

  protected createArrayFromValueObjects(): Array<ValueObjectAbstract<any>> {
    const result = new Array<ValueObjectAbstract<any>>();
    if (this.permissionId) result.push(this.permissionId);
    if (this.name) result.push(this.name);
    if (this.state) result.push(this.state);
    return result;
  }
}
