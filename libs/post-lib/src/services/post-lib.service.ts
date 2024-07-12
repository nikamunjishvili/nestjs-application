import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserLibService } from 'libs/user-lib';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '../schemas/post.schema';
import { UserNotFound } from '../errors/users.error';

@Injectable()
export class PostLibService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly userService: UserLibService,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.findById(createPostDto.user);
    if (!user) {
      throw UserNotFound;
    }

    const post = await this.postModel.create(createPostDto);

    this.userService.addPost(user._id as ObjectId, post._id as ObjectId);

    return await post.populate('user');
  }

  findAll() {
    return this.postModel.find();
  }
}
