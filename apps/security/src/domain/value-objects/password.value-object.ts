import { ValueObjectAbstract } from '@sofkau/ddd';
import Ajv, { JSONSchemaType } from 'ajv';

export class PasswordValueObject extends ValueObjectAbstract<string> {
  private schema: JSONSchemaType<{ value: string }>;
  private ajv: Ajv;

  constructor(value?: string) {
    super(value);
    this.ajv = new Ajv();
    this.schema = {
      type: 'object',
      properties: {
        value: {
          type: 'string',
          pattern:
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%&*()_-+={}[]<>.,])[A-Za-zd!@#$%&*()_-+={}[]<>.,]{8,}$',
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
      throw new Error('Invalid password');
    }
  }
}
