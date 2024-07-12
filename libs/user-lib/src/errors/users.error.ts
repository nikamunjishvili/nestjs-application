import { BadRequestException } from '@nestjs/common';

const UserAlreadyExists = new BadRequestException('User already exists');

export { UserAlreadyExists };
