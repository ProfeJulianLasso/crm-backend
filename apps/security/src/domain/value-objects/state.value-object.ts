import { ValueObjectAbstract } from '@sofkau/ddd';
import Ajv, { JSONSchemaType } from 'ajv';

export class StateValueObject extends ValueObjectAbstract<boolean> {
  private schema: JSONSchemaType<{ state: boolean }>;
  private ajv: Ajv;

  constructor(value?: boolean) {
    super(value);
    this.ajv = new Ajv();
    this.schema = {
      type: 'object',
      properties: {
        state: {
          type: 'boolean',
        },
      },
      required: ['state'],
      additionalProperties: false,
    };
  }

  validateData(): void {
    if (this.ajv) {
      const validate = this.ajv.compile(this.schema);
      const valid = validate({ state: this._value });
      if (!valid) {
        this.setError({
          field: 'state',
          message: validate.errors?.at(-1)?.message ?? 'Invalid state',
        });
      }
    }
  }
}
