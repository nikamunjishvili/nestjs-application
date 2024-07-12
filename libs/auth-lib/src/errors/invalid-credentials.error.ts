import { BadRequestException } from "@nestjs/common";

const InvalidCredentials = new BadRequestException('Invalid Credentials!');


export {InvalidCredentials};