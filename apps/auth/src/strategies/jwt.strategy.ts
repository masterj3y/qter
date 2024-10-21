import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const httpToken = this.extractJwtFromBearer(
            request?.headers?.authorization,
          );

          const tcpToken = this.extractJwtFromBearer(request?.authorization);
          return httpToken || tcpToken;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    return this.usersService.findUserById(userId);
  }

  private extractJwtFromBearer(authorization: any) {
    if (!authorization) return undefined;
    return String(authorization).replace('Bearer ', '');
  }
}
