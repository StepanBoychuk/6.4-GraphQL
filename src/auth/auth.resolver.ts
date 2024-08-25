import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInputDto } from './dto/signup.input.dto';
import { User } from 'src/users/entities/user.entitie';
import { SignInResponseDto } from './dto/signin.response.dto';
import { SignInInputDto } from './dto/signin.input.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignInResponseDto)
  async signin(@Args('signInInput') signInInput: SignInInputDto) {
    const user = await this.authService.signin(signInInput);
    if (!user) throw new Error('Wrong credentials');
    return user;
  }

  @Mutation(() => User)
  async signup(@Args('signUpInput') signUpInput: SignUpInputDto) {
    return this.authService.signup(signUpInput);
  }
}
