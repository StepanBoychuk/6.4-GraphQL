import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Vote {
  @Field()
  id: string;

  @Field()
  user: string;

  @Field()
  targetUser: string;

  @Field((type) => Int)
  voteType: number;
}
