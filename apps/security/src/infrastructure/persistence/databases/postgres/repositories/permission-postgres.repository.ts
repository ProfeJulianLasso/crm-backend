import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from, map, tap } from 'rxjs';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { IPermissionRepository } from '../../../../../domain/repositories';
import { PermissionPostgresEntity } from '../entities';
import { ExceptionHandler } from './helpers';

@Injectable()
export class PermissionPostgresRepository<
  Entity extends PermissionPostgresEntity = PermissionPostgresEntity,
> implements IPermissionRepository<Entity>
{
  constructor(
    @InjectRepository(PermissionPostgresEntity)
    private readonly repository: Repository<Entity>,
  ) {}

  findBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Observable<Entity[]> {
    return from(this.repository.findBy(where)).pipe(
      catchError((error) => {
        throw new Error(error);
      }),
    );
  }

  findAll(options?: FindManyOptions<Entity>): Observable<Entity[]> {
    return from(this.repository.find(options)).pipe(
      catchError((error) => {
        throw new Error(error);
      }),
    );
  }

  findById(permissionId: string): Observable<Entity> {
    return from(
      this.repository.findOneBy({ permissionId } as FindOptionsWhere<Entity>),
    ).pipe(
      tap((permission) => {
        if (!permission) throw new NotFoundException('Permission not found');
      }),
      map((permission: Entity) => permission),
    );
  }

  save(permission: Entity): Observable<Entity> {
    return from(
      this.repository
        .findOneBy({
          permissionId: permission.permissionId,
        } as FindOptionsWhere<Entity>)
        .then((permissionDataFlow) => {
          if (permissionDataFlow)
            throw new ConflictException('Permission already exists');
          return this.repository.save(permission);
        }),
    ).pipe(catchError((error) => ExceptionHandler(error)));
    // return from(this.repository.save(permission)).pipe(
    //   catchError((error) => {
    //     throw new Error(error);
    //   }),
    // );
  }

  update(permissionId: string, permission: Entity): Observable<Entity> {
    return from(
      this.repository
        .findOneBy({ permissionId } as FindOptionsWhere<Entity>)
        .then((permissionDataFlow) => {
          if (!permissionDataFlow)
            throw new NotFoundException('Permission not found');
          return this.repository.save({
            ...permissionDataFlow,
            ...permission,
            permissionId,
          });
        }),
    ).pipe(
      catchError((error) => {
        throw new Error(error);
      }),
    );
  }

  delete(permissionId: string): Observable<boolean> {
    return from(
      this.repository
        .findOneBy({
          permissionId,
        } as FindOptionsWhere<Entity>)
        .then(async (permission) => {
          if (!permission) throw new NotFoundException('Permission not found');
          await this.repository.remove(permission);
          return true;
        }),
    );
    // return from(
    //   this.repository
    //     .createQueryBuilder()
    //     .delete()
    //     .from(PermissionPostgresEntity, 'permissions')
    //     .where('permissionId = :permissionId', { permissionId })
    //     .execute(),
    // ).pipe(
    //   tap((data) => {
    //     if (data.affected === 0)
    //       throw new NotFoundException('Permission not found');
    //   }),
    //   map(() => {
    //     return true;
    //   }),
    // );
  }
}
