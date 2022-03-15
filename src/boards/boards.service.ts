import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    // InjectRepository
    // - 이 서비스에서 BoardRepository를 이용한다고 boardRepository 변수에 넣어줌
    // - 그래야 Repository를 넣고 조회, 생성, ... 등의 기능을 사용할 수 있음
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   console.log(board);
  //   this.boards.push(board);
  //   return board;
  // }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // getBoardById(id: string): Board {
  //   const board = this.boards.find((board) => board.id === id);
  //   if (!board) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return board;
  // }

  // async await
  // - DB 작업이 끝난 후 결과값을 받을 수 있도록 함
  // - 작성하지 않으면, 처리 전에 결과값이 리턴될 수 있음
  async getBoardById(id: number): Promise<Board> {
    // findOne({}): 특정 column 값으로 row 찾기
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  // deleteBoard(id: string): void {
  //   const board = this.getBoardById(id);
  //   if (!board) {
  //     throw new NotFoundException();
  //   }
  //   this.boards = this.boards.filter((board) => board.id !== id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   if (!board) {
  //     throw new NotFoundException();
  //   }
  //   board.status = status;
  //   return board;
  // }
}
