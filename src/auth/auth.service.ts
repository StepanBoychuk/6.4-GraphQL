import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { SignUpInputDto } from './dto/signup.input.dto';
import { SignInInputDto } from './dto/signin.input.dto';
import { HashService } from 'src/hash/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async signup(signUpInput: SignUpInputDto): Promise<User> {
    const user = await this.userModel.findOne({
      username: signUpInput.username,
    });
    if (user) throw new ConflictException('Username is already taken');
    const newUser = new this.userModel(signUpInput);
    return await newUser.save();
  }

  async signin(signinInput: SignInInputDto): Promise<object> {
    const user = await this.userModel.findOne(
      { username: signinInput.username },
      'id username password role',
    );
    if (!user) return;
    if (
      user.password ===
      (await this.hashService.hashPassword(signinInput.password))
    ) {
      const userData = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      return {
        access_token: this.jwtService.sign(userData),
        user,
      };
    }
  }
}
