import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserInputDto } from './dto/updateUser.input.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find(
      {},
      'username firstName lastName avatarUrl rating role',
    );
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(
      id,
      'username firstName lastName avatarUrl rating role',
    );
  }

  async updateUser(
    id: string,
    updateUserInput: UpdateUserInputDto,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, {
      new: true,
      select: 'username firstName lastName avatarUrl rating role',
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { deletedAt: Date.now() },
      {
        new: true,
        select: 'username firstName lastName avatarUrl rating role',
      },
    );
  }
}
