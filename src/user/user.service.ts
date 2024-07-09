import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schemas';

type ObjectId = mongoose.Schema.Types.ObjectId;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findById(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  findAll() {
    return this.userModel.find().populate('posts');
  }

  findOne(email: string) {
    return this.userModel.findOne({email}).select(["email", "password"]);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async addPost(userId: ObjectId, postId: ObjectId): Promise<void> {
    const user = await this.userModel.findById(userId);
    user.posts.push(postId);
    await user.save();
  }
}
