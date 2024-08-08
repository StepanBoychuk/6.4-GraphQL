import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
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

  async signup(signUpInput: SignUpInput): Promise<User> {
    const user = await this.userModel.findOne({
      username: signUpInput.username,
    });
    if (user) throw new ConflictException('Username is already taken');
    const newUser = new this.userModel(signUpInput);
    return await newUser.save();
  }

  async signin(signinInput: SignInInput): Promise<object> {
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
