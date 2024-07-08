import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model, ObjectId } from 'mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly userService: UserService,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.findById(createPostDto.user);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const post = await this.postModel.create(createPostDto);

    this.userService.addPost(user._id as ObjectId, post._id as ObjectId);

    return await post.populate('user');
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
