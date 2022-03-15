// TypeOrm 설정 파일
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// postgresql에서 생성한 db 설정을 작성해줌
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  // entity로 db table을 생성해줄 것이므로, entity 파일이 어디있는지 설정해줌
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // 애플리케이션을 다시 실행할 때,
  // entity 안에서 수정된 column의 길이, 타입, 변경 값 등을 해당 테이블을 drop한 후 다시 생성해주는 옵션
  synchronize: true,
};
