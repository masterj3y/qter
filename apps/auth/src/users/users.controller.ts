import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserDocument } from './models/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from '@app/common/interceptors/serialize.interceptor';
import { GetUserDto } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Serialize(GetUserDto)
  @Get()
  getUser(@CurrentUser() user: UserDocument) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(GetUserDto)
  @Patch()
  updateUser(
    @CurrentUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(user._id.toString(), updateUserDto);
  }
}
