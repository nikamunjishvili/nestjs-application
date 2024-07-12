import { Module } from '@nestjs/common';
import { AuthLibService } from './services/auth-lib.service';

@Module({
  providers: [AuthLibService],
  exports: [AuthLibService],
})
export class AuthLibModule {}
