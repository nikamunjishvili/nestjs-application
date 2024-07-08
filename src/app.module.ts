import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@nest-autentication.8lz05oa.mongodb.net/?retryWrites=true&w=majority&appName=nest-autentication`,
    ),
    PostModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
