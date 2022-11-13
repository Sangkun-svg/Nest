import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/providers';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/lib/tokens';

const SALT_ROUNDS = 10;
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    public userRepository: Repository<User>,
  ) {}

  async generateTokens(userId: number, username: string) {
    const accessToken = generateToken({
      type: 'access_token',
      userId: userId,
      tokenId: 1,
      username: username,
    });
    const refreshToken = generateToken({
      type: 'refresh_token',
      tokenId: 1,
      rotationCounter: 1,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async create(createUser: CreateUserDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(createUser.passwordHash, salt);
      const user = await this.userRepository.save({
        ...createUser,
        passwordHash: hash,
      });
      const tokens = await this.generateTokens(user.id, user.name);
      console.log('tokens : ', tokens);
      return {
        user,
        tokens,
      };
    } catch (error) {
      throw new BadRequestException('User register error');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
