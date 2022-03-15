import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport.strategy';

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
  exports: [
    // 두 파일은 auth module 뿐만 아니라, 다른 모듈에서도 사용이 됨
    JwtStrategy,
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
