import { ValueObjectAbstract } from '@sofkau/ddd';

export class PermissionIdValueObject extends ValueObjectAbstract<string> {
  protected _className: string;

  constructor(value?: string) {
    super(value);
    this._className = 'PermissionIdValueObject';
  }

  validateData(): void {
    throw new Error('Method not implemented.');
  }
}
