import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../dto/sign-up.dto.';
import * as bcrypt from 'bcrypt';
import { SignInDto } from '../dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserAlreadyExists } from '../errors/user.errors';
import { InvalidCredentials } from '../errors/invalid-credentials.error';
import { UserLibService } from 'libs/user-lib';
import { SignUpPayload } from '../dto/sign-up-payload.dto';
import { SignInPayload } from '../dto/sign-in-payload.dto';

@Injectable()
export class AuthLibService {
  constructor(
    private readonly usersService: UserLibService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpPayload> {
    const { email, password } = signUpDto;
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) throw UserAlreadyExists;

    const hashedPassword = await bcrypt.hash(password, 5);
    this.usersService.create({ email, password: hashedPassword });
    return {success: true, message: "User registered success!!"}
  }

  async signIn(signInDto: SignInDto):Promise<SignInPayload> {
    const { email, password } = signInDto;
    const user = await this.usersService.findOne(email);
    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!user || !arePasswordsEqual) {
      throw InvalidCredentials;
    }

    const access_token = await this.jwtService.sign({ email });

    return { status: true, token: access_token };
  }
}
