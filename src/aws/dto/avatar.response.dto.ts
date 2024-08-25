import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AvatarUploadResponseDto {
  @Field()
  urlForUpload: string;
}
