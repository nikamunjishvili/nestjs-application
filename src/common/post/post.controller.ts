import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreatePostDto } from '../../../libs/post-lib/src/dto/create-post.dto';
import { PostLibService } from 'libs/post-lib';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostLibService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll().populate("user");
  }

}
