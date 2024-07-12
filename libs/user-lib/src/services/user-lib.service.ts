import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schemas';
import { UserAlreadyExists } from '../errors/users.error';
import { ObjectId } from '../interfaces/objectId.interface';

@Injectable()
export class UserLibService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw UserAlreadyExists;
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
    return this.userModel.findOne({ email }).select(['email', 'password']);
  }

  async addPost(userId: ObjectId, postId: ObjectId): Promise<void> {
    const user = await this.userModel.findById(userId);
    user.posts.push(postId);
    await user.save();
  }
}
