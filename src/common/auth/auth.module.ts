import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/common/user/user.module';
import {JwtModule} from '@nestjs/jwt';
import { AuthLibService } from 'libs/auth-lib';

@Module({
  imports: [
    JwtModule.register({
      secret: "super_secret",
      signOptions: {
        expiresIn: "1h"
      }
    }),
    UserModule],
  controllers: [AuthController],
  providers: [AuthLibService],
})
export class AuthModule {}
