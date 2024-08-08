import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

@InputType()
export class AvatarUploadInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Matches(/\.(jpg|jpeg|png|bmp)$/i, {
    message:
      'File name must have a valid image extension (.jpg, .jpeg, .png, .bmp)',
  })
  avatarName: string;
}
