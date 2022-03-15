import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './no-spec/auth/auth.controller';

@Module({
  imports: [
    // 작성한 TypeORM 설정을 imports하여 TypeORM을 사용할 수 있게 함
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
