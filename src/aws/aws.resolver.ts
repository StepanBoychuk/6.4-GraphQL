import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AwsService } from './aws.service';
import { AvatarUploadResponse } from './dto/avatar.response';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AvatarUploadInput } from './dto/avatar.input';
import { CurrentUser } from 'src/users/decorators/user.decorator';

@Resolver()
export class AwsResolver {
  constructor(private awsService: AwsService) {}

  @Mutation(() => AvatarUploadResponse)
  @UseGuards(JwtAuthGuard)
  async avatarUpload(
    @Args('avatarUploadInput') avatarUploadInput: AvatarUploadInput,
    @CurrentUser() user,
  ) {
    return {
      urlForUpload: await this.awsService.getPresignedURL(
        user.id,
        avatarUploadInput.avatarName,
      ),
    };
  }
}
