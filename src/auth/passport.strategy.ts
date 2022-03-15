import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from 'config';

@Injectable()
// strategy를 작성을 완료한 후, 작동시키기 위해서는 auth module의 providers에 추가해주어야만 함
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // 유저이름으로 유저를 find 해야하므로 UserRepository를 inject함
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // super: 부모 생성자 호출. 부모 component를 사용하기 위해서 작성.
    // 즉, PassportStrategy에 있는 jwtFromRequest, ignoreExpiration, secretOrKey 각각에 아래 해당하는 값들을 넘겨준다.
    // 이와 같은 파생 클래스(extends를 사용하는 class)는 super() 함수가 먼저 호출되어야만 this 키워드를 사용할 수 있다.
    // 그렇지 않으면 참조 오류가 발생함.
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'), // jwt sercret key(signature) 토큰 생성 시 사용한 값과 동일한 값으로 작성 (토큰이 유효한지 확인하는데에 사용됨)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰이 어디서 왔는가
    });
  }

  // validate
  // - 토큰이 유효한지 확인될 때(인증완료) 실행되는 메서드
  // - PassportStrategy가 제공
  // - 토큰 값이 유효하면, 토큰으로 부터 payload 값을 가져옴
  // - done : (1) 에러 (2) req에 추가하여 넘겨줄 값
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
