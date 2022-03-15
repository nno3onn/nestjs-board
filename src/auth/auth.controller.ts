import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  // UseGuards
  // - NestJS passport 인증 미들웨어
  // - 작성한 PassportStrategy를 실행시켜줌
  // (+) 미들웨어 순서
  //    middleware -> guard -> interceptor -> pipe -> controller -> service -> interceptor -> filter -> client
  // @UseGuards(AuthGuard())
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req.user);
    // User {
    //   id: 7,
    //   username: 'hibye',
    //   password: '$2a$10$hehk4LAhspp/DUTRLsebiO8HKI81s6fdBcVzmbD0KDTVmIKJYO.Zy'
    // }
  }
}
