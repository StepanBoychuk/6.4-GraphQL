import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteResolver } from './vote.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteSchema } from './schemas/vote.schema';
import { UserSchema } from 'src/users/schemas/user.schema';
import { UpdateUsersRating } from './scheduledTasks/updateUsersRating';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Vote', schema: VoteSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [VoteService, VoteResolver, UpdateUsersRating],
})
export class VoteModule {}
