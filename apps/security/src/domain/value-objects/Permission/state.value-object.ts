import { ValueObjectAbstract } from '@sofkau/ddd';

export class StateValueObject extends ValueObjectAbstract<boolean> {
  protected _className: string;

  constructor(value?: boolean) {
    super(value);
    this._className = 'StateValueObject';
  }

  validateData(): void {
    throw new Error('Method not implemented.');
  }
}
