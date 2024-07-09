import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import {JwtModule} from '@nestjs/jwt';

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
  providers: [AuthService],
})
export class AuthModule {}
