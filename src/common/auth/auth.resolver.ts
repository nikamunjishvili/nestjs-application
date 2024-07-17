import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthLibService } from 'libs/auth-lib';
import { SignInPayload } from 'libs/auth-lib/dto/sign-in-payload.dto';
import { SignUpPayload } from 'libs/auth-lib/dto/sign-up-payload.dto';
import { SignUpInput } from 'libs/auth-lib/dto/sign-up.args';
import { GqlAuthGuard } from 'libs/auth-lib/guard/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthLibService) {}
  
  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  me(){
    return "Mee!!"
  }

  @Mutation(() => SignUpPayload)
  signUp(@Args('signUp') signUpInput: SignUpInput): Promise<SignUpPayload> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => SignInPayload)
  signIn(@Args('signIn') signInInput: SignUpInput): Promise<SignInPayload> {
    return this.authService.signIn(signInInput);
  }
}
