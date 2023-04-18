import { ValueObjectAbstract } from '@sofkau/ddd';
import Ajv, { JSONSchemaType } from 'ajv';
import { CustomerPermissions, RolePermissions } from '../../enums';

export class NameValueObject extends ValueObjectAbstract<string> {
  private schema: JSONSchemaType<{
    name: CustomerPermissions | RolePermissions;
  }>;
  private ajv: Ajv;

  constructor(value?: string) {
    super(value);
    this.ajv = new Ajv();
    this.schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          enum: [
            ...Object.values(CustomerPermissions),
            ...Object.values(RolePermissions),
          ],
        },
      },
      required: ['name'],
      additionalProperties: false,
    };
  }

  validateData(): void {
    if (this.ajv) {
      const validate = this.ajv.compile(this.schema);
      const valid = validate({ name: this._value });
      if (!valid) {
        this.setError({
          field: 'name',
          message: validate.errors?.at(-1)?.message ?? 'Invalid name',
        });
      }
    }
  }
}
