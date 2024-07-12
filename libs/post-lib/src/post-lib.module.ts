import { Module } from '@nestjs/common';
import { PostLibService } from './services/post-lib.service';

@Module({
  providers: [PostLibService],
  exports: [PostLibService],
})
export class PostLibModule {}
