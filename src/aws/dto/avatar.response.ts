import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AvatarUploadResponse {
  @Field()
  urlForUpload: string;
}
