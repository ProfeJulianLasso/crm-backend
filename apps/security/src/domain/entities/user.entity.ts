import { Role } from './role.entity';

export class User {
  id: string;
  email: string;
  password: string;
  role: Role;
}
