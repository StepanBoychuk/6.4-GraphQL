import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsResolver } from './aws.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';
import { UpdateUsersAvatarUrl } from './scheduledTasks/updateUsersAvatarUrl';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AwsService, AwsResolver, UpdateUsersAvatarUrl],
})
export class AwsModule {}
