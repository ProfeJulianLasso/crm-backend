import { ValueObjectAbstract } from '@sofkau/ddd';
import Ajv, { JSONSchemaType } from 'ajv';
import { Role as Roles } from '../../enums';

export class NameValueObject extends ValueObjectAbstract<string> {
  private schema: JSONSchemaType<{ value: Roles }>;
  private ajv: Ajv;

  constructor(value?: string) {
    super(value);
    this.ajv = new Ajv();
    this.schema = {
      type: 'object',
      properties: {
        value: {
          type: 'string',
          // minLength: 3,
          // maxLength: 20,
          // pattern: '^[a-zA-Z_\\-.]*$',
          enum: [...Object.values(Roles)],
        },
      },
      required: ['value'],
      additionalProperties: false,
    };
  }

  validateData(): void {
    const validate = this.ajv.compile(this.schema);
    const valid = validate({ value: this.value });
    if (!valid) {
      console.log(`validateData ${this._className}`, validate.errors);
      throw new Error('Invalid name');
    }
  }
}
