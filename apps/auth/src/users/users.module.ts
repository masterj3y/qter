import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
