import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entitie';

@ObjectType()
export class SignInResponseDto {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
