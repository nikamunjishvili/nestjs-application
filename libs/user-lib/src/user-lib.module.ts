import { Module } from '@nestjs/common';
import { UserLibService } from './services/user-lib.service';

@Module({
  providers: [UserLibService],
  exports: [UserLibService],
})
export class UserLibModule {}
