import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nikamunjishvili:nestjs-auth@re-edu.aplqjps.mongodb.net/?retryWrites=true&w=majority&appName=re-edu',
    ),
    PostModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
