import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Vote } from './schemas/vote.schema';

@Injectable()
export class VoteService {
  constructor(@InjectModel('Vote') private voteModel: mongoose.Model<Vote>) {}

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
