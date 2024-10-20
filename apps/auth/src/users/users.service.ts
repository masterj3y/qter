import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './models/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserInterface } from './interfaces/create-user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserInterface: CreateUserInterface) {
    const createdUser = await this.userModel.create({
      _id: new Types.ObjectId(),
      ...createUserInterface,
    });

    return await createdUser.save();
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findUserById(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  async updateUser(userId: string, updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException(`user not found with id ${userId}`);
    }

    Object.assign(user, updateUserDto);

    return user.save();
  }
}
