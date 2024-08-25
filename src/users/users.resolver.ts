import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entitie';
import { UsersService } from './users.service';
import { UpdateUserInputDto } from './dto/updateUser.input.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async findOne(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInputDto,
  ) {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Args('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
