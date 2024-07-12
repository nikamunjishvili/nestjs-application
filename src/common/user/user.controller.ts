import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from '../../../libs/user-lib/src/dto/create-user.dto';
import { UserLibService } from 'libs/user-lib';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserLibService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

}
