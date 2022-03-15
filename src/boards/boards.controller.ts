import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post()
  // Handler-level Pipes
  // 메서드(createBoard)가 호출되기 직전에 파이프를 삽입하고,
  // 파이프는 메서드로 향하는 인수(createBoardDto)를 수신하여 이에 대해 작동한다.
  @UsePipes(ValidationPipe)
  // ValidationPipe: 값의 유효성 체크
  // - ValidationPipe <-> class-validator와 함께 쓰임
  // - CreateBoardDto에 작성한 class-validator 데코레이터(@IsNotEmpty)를 충족하는지 봄
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoard(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    // Parameter-level Pipes
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardService.updateBoardStatus(id, status);
  }
}
