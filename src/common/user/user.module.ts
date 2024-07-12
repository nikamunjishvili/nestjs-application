import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../libs/user-lib/src/schemas/user.schemas';
import { UserLibService } from 'libs/user-lib';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserLibService],
  exports: [UserLibService],
})
export class UserModule {}
