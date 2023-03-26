import { Permission } from './permission.entity';

export class Role {
  id: string;
  name: string;
  permissions: Permission[];
}
