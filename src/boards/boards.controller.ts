import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
// 모든 핸들러에 AuthGuard 영향을 줌 (인증된 유저만 게시물을 보고 쓸 수 있도록 함)
@UseGuards(AuthGuard())
export class BoardsController {
  // Logger(로그를 발생시킨 위치)
  private logger = new Logger('BoardsController');
  constructor(private boardService: BoardsService) {}

  // @Get()
  // getAllBoard(): Board[] {
  //   return this.boardService.getAllBoards();
  // }

  @Get()
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardService.getAllBoards(user);
  }

  // @Post()
  // // Handler-level Pipes
  // // 메서드(createBoard)가 호출되기 직전에 파이프를 삽입하고,
  // // 파이프는 메서드로 향하는 인수(createBoardDto)를 수신하여 이에 대해 작동한다.
  // @UsePipes(ValidationPipe)
  // // ValidationPipe: 값의 유효성 체크
  // // - ValidationPipe <-> class-validator와 함께 쓰임
  // // - CreateBoardDto에 작성한 class-validator 데코레이터(@IsNotEmpty)를 충족하는지 봄
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardService.createBoard(createBoardDto);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    // 커스텀 데코레이터. token 속 user 정보도 같이 전달받음
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} creating a new board. Payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardService.createBoard(createBoardDto, user);
  }

  // @Get('/:id')
  // getBoard(@Param('id') id: string): Board {
  //   return this.boardService.getBoardById(id);
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardService.deleteBoard(id);
  // }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   // Parameter-level Pipes
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardService.updateBoardStatus(id, status);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
