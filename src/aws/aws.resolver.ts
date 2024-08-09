import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AwsService } from './aws.service';
import { AvatarUploadResponseDto } from './dto/avatar.response.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AvatarUploadInputDto } from './dto/avatar.input.dto';
import { CurrentUser } from 'src/users/decorators/user.decorator';

@Resolver()
export class AwsResolver {
  constructor(private awsService: AwsService) {}

  @Mutation(() => AvatarUploadResponseDto)
  @UseGuards(JwtAuthGuard)
  async avatarUpload(
    @Args('avatarUploadInput') avatarUploadInput: AvatarUploadInputDto,
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
