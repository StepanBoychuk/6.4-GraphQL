import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { VoteService } from './vote.service';
import { Vote } from './entities/vote.entitie';
import { HttpException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { VoteInputDto } from './dto/vote.input.dto';
import { CurrentUser } from 'src/users/decorators/user.decorator';

@Resolver()
export class VoteResolver {
  constructor(private voteService: VoteService) {}

  @Mutation(() => Vote)
  @UseGuards(JwtAuthGuard)
  async vote(@Args('voteInput') voteInput: VoteInputDto, @CurrentUser() user) {
    if (user.id == voteInput.targetUser) {
      throw new HttpException('You cannot vote for yourself', 400);
    }
    if ((await this.voteService.canVote(user.id)) == false) {
      throw new HttpException('You can vote once per hour', 429);
    }
    return await this.voteService.vote(
      user.id,
      voteInput.targetUser,
      voteInput.voteType,
    );
  }
}
