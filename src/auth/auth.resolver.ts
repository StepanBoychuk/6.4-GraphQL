import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup.input';
import { User } from 'src/users/entities/user.entitie';
import { SignInResponse } from './dto/signin.response';
import { SignInInput } from './dto/signin.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignInResponse)
  async signin(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.authService.signin(signInInput);
    if (!user) throw new Error('Wrong credentials');
    return user;
  }

  @Mutation(() => User)
  async signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signup(signUpInput);
  }
}
