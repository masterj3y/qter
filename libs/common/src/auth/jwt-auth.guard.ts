import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto/user/user.dto';

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToHttp().getRequest().headers.authorization;
    if (!token) {
      return false;
    }

    return this.authClient
      .send<UserDto>('authenticate', {
        authorization: token,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
      );
  }
}
