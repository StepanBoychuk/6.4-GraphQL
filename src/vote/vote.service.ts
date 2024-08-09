import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Vote } from './schemas/vote.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel('Vote') private voteModel: mongoose.Model<Vote>,
    @InjectModel('User') private userModel: mongoose.Model<User>,
  ) {}

  async canVote(id: string): Promise<boolean> {
    const oneHourAgo = new Date(Date.now() - 3600000);
    const userVote = await this.voteModel.findOne({
      user: id,
      updatedAt: { $gt: oneHourAgo },
    });
    if (userVote) return false;
    return true;
  }

  async vote(id: string, targetUser: string, voteType: number): Promise<Vote> {
    const user = await this.userModel.exists({ _id: targetUser });
    if (!user) throw new HttpException('User not found', 404);
    const vote = await this.voteModel.findOne({
      user: id,
      targetUser: targetUser,
    });
    if (!vote) {
      const newVote = new this.voteModel({
        user: id,
        targetUser: targetUser,
        voteType: voteType,
      });
      return await newVote.save();
    }
    if (vote.voteType == voteType) {
      vote.voteType = 0;
      return await vote.save();
    }
    vote.voteType = vote.voteType;
    return await vote.save();
  }
}
