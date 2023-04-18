import { ValueObjectAbstract } from '@sofkau/ddd';
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

export class EmailValueObject extends ValueObjectAbstract<string> {
  private schema: JSONSchemaType<{ value: string }>;
  private ajv: Ajv;

  constructor(value?: string) {
    super(value);
    this.ajv = new Ajv();
    addFormats(this.ajv, { mode: 'fast', formats: ['email'] });
    this.schema = {
      type: 'object',
      properties: {
        value: {
          type: 'string',
          format: 'email',
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
      throw new Error('Invalid email');
    }
  }
}
