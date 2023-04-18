import { Observable } from 'rxjs';
import { PermissionType } from '../entities';

export interface IPermissionRepository<
  Entity extends PermissionType = PermissionType,
> {
  findBy(...where: any[]): Observable<Entity[]>;
  findAll(...options: any[]): Observable<Entity[]>;
  findById(permissionId: string): Observable<Entity>;
  save(permission: Entity): Observable<Entity>;
  update(permissionId: string, permission: Entity): Observable<Entity>;
  delete(permissionId: string): Observable<boolean>;
}
