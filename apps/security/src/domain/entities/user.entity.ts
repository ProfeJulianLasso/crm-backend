import {
  ValueObjectAbstract,
  ValueObjectsErrorHandlerAbstract,
} from '@sofkau/ddd';
import {
  EmailValueObject,
  PasswordValueObject,
  StateValueObject,
  UserIdValueObject,
} from '../value-objects';
import { Role, RoleType } from './role.entity';

export type UserType = {
  userId: string;
  email: string;
  password: string;
  state: boolean;
  role?: RoleType;
};

export class User<
  UserTypeGeneric extends UserType = UserType,
> extends ValueObjectsErrorHandlerAbstract {
  userId: UserIdValueObject;
  email: EmailValueObject;
  password: PasswordValueObject;
  state: StateValueObject;
  role: Role;

  constructor(props?: UserTypeGeneric) {
    super();
    this._errorMessage = 'Existen errores en los Value Objects';

    this.userId = new UserIdValueObject();
    if (props && props.userId) this.userId.value = props.userId;

    this.email = new EmailValueObject();
    if (props && props.email) this.email.value = props.email;

    this.password = new PasswordValueObject();
    if (props && props.password) this.password.value = props.password;

    this.state = new StateValueObject(true);
    if (props && props.state) this.state.value = props.state;

    this.role = new Role();
    if (props && props.role) this.role = new Role(props.role);

    this.validateValueObjects(
      this._errorMessage,
      this.createArrayFromValueObjects(),
    );
  }

  changeEmail(email: string): void {
    this.email.value = email;
  }

  changePassword(password: string): void {
    this.password.value = password;
  }

  changeState(state: boolean): void {
    this.state.value = state;
  }

  changeRole(role: Role): void {
    this.role = role;
  }

  toPrimitives() {
    this.validateValueObjects(
      this._errorMessage,
      this.createArrayFromValueObjects(),
    );
    return {
      userId: this.userId.valueOf(),
      email: this.email.valueOf(),
      password: this.password.valueOf(),
      state: this.state.valueOf(),
      role: this.role.toPrimitives(),
    };
  }

  protected createArrayFromValueObjects(): ValueObjectAbstract<any>[] {
    const result = new Array<ValueObjectAbstract<any>>();

    if (this.userId.hasValue()) result.push(this.userId);

    if (this.email.hasValue()) result.push(this.email);

    if (this.password.hasValue()) result.push(this.password);

    if (this.state.hasValue()) result.push(this.state);

    const role = this.role.createArrayFromValueObjects();
    if (role.length > 0) result.push(...role);

    return result;
  }
}
