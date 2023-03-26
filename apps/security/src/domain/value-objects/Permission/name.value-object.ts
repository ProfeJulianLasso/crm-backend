import { ValueObjectAbstract } from '@sofkau/ddd';

export class NameValueObject extends ValueObjectAbstract<string> {
  protected _className: string;

  constructor(value?: string) {
    super(value);
    this._className = 'NameValueObject';
  }

  validateData(): void {
    throw new Error('Method not implemented.');
  }
}
