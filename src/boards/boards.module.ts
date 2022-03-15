import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    // 생성한 Repository를 다른 곳에서 사용할 수 있도록 imports함
    TypeOrmModule.forFeature([BoardRepository]),
    // AuthGuard를 사용하기 위함
    AuthModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
