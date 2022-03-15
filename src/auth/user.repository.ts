import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });

    // user Entity의 @Unique에서 이미 있는 이름을 저장하는 경우에 에러 발생 시, 에러 내용을 다르게 주기 위함
    try {
      await this.save(user);
    } catch (err) {
      if (err.code === 23505) {
        throw new ConflictException('Existing username');
        // {
        //     "statusCode": 500,
        //     "message": "Internal Server Error"
        // }
      }
      throw new InternalServerErrorException();
    }
  }
}
