import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string;
}
