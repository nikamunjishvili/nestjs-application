import { BadRequestException } from '@nestjs/common';

const UserNotFound = new BadRequestException('User Not Found');

export { UserNotFound };