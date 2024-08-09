import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsMongoId } from 'class-validator';

@InputType()
export class VoteInputDto {
  @Field()
  @IsMongoId({ message: 'Wrong target user id' })
  targetUser: string;

  @Field((type) => Int)
  @IsIn([-1, 1])
  voteType: number;
}
