import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto.';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    return this.usersService.create({email, password: hashedPassword})
  }

  async signIn(){
    
  }
}
