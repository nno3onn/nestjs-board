import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // passport 모듈 추가
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // jwt 모듈 추가
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: {
        expiresIn: 60 * 60, // 1시간 동안 토큰값 유효함
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
