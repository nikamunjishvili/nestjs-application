import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Post,
  PostSchema,
} from '../../../libs/post-lib/src/schemas/post.schema';
import { UserModule } from 'src/common/user/user.module';
import { PostLibService } from 'libs/post-lib';
import { PostResolver } from './post.resolver';
import { UserLibService } from 'libs/user-lib';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostLibService, PostResolver],
})
export class PostModule {}
