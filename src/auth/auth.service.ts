import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto.';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    return this.usersService.create({ email, password: hashedPassword });
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new BadRequestException('Invalid Credentials!');
    }
    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual) {
      throw new BadRequestException('Invalid Credentials');
    }

    const jwtPayload = {
      email,
    };

    const access_token = await this.jwtService.sign(jwtPayload);

    return { access_token };
  }
}
