import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { SignupDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { SigninDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = await this.usersService.findUserByEmail(signupDto.email);
    console.log(user);
    if (user) {
      throw new UnprocessableEntityException('email already in use');
    }

    const createdUser = await this.usersService.createUser({
      ...signupDto,
      password: await bcrypt.hash(signupDto.password, 12),
    });

    const tokenPayload: TokenPayload = {
      userId: createdUser._id.toString(),
    };

    const token = this.jwtService.sign(tokenPayload);
    return { token };
  }

  async signin(signinDto: SigninDto) {
    const authenticationException = new ForbiddenException(
      'email or password is incorrect',
    );

    const user = await this.usersService.findUserByEmail(signinDto.email);
    if (!user) {
      throw authenticationException;
    }
    const isPasswordCorrect = await bcrypt.compare(
      signinDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw authenticationException;
    }

    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
    };

    const token = this.jwtService.sign(tokenPayload);
    return { token };
  }
}
