import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/providers';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    public userRepository: Repository<User>,
  ) {}

  async create(createUser: CreateUserDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(createUser.passwordHash, salt);
      const result = await this.userRepository.save({
        ...createUser,
        passwordHash: hash,
      });
      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
