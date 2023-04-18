import { ValueObjectAbstract } from '@sofkau/ddd';
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

export class PermissionIdValueObject extends ValueObjectAbstract<string> {
  private schema: JSONSchemaType<{ permissionId: string }>;
  private ajv: Ajv;

  constructor(value?: string) {
    super(value);
    this.ajv = new Ajv();
    addFormats(this.ajv, { mode: 'fast', formats: ['uuid'] });
    this.schema = {
      type: 'object',
      properties: {
        permissionId: {
          type: 'string',
          format: 'uuid',
        },
      },
      required: ['permissionId'],
      additionalProperties: false,
    };
  }

  validateData(): void {
    if (this.ajv) {
      const validate = this.ajv.compile(this.schema);
      const valid = validate({ permissionId: this._value });
      if (!valid) {
        this.setError({
          field: 'permissionId',
          message: validate.errors?.at(-1)?.message ?? 'Invalid permissionId',
        });
      }
    }
  }
}
