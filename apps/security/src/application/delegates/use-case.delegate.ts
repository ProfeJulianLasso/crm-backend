import { IUseCase } from '@sofkau/ddd';
import { Observable, tap } from 'rxjs';
import { IPermissionRepository } from '../../domain/repositories';
import {
  CreatePermissionUseCase,
  UpdateNamePermissionUseCase,
} from '../use-cases';
import { IDelegate } from './delegate.interface';

export class UseCaseDelegate implements IDelegate {
  private delegate: IUseCase<any, any>;

  constructor(private readonly repository: IPermissionRepository) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate
      .execute(...args)
      .pipe(tap((data) => console.log('🗣️ Emitir evento', data)));
  }

  toCreatePermission(): this {
    this.delegate = new CreatePermissionUseCase(this.repository);
    return this;
  }

  toUpdateNamePermission(): this {
    this.delegate = new UpdateNamePermissionUseCase(this.repository);
    return this;
  }
}
