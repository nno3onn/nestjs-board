import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // 애플리케이션을 다시 실행할 때, entity 안에서 수정된 column의 길이 타입 변경 값등을 해당 테이블을 drop한 후 다시 생성해준다.
};
