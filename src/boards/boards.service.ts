import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  async getAllBoards(user: User): Promise<Board[]> {
    // createQueryBuilder(쿼리할 테이블명)
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany(); // 전체 게시글을 불러옴 (getOne도 있음)

    return boards;
  }

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

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
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

  // remove vs delete
  // - remove: 무조건 존재하는 아이템만 삭제할 수 있음. 없으면 에러 발생
  //            (1) 아이템 유무 확인 (2) 아이템 삭제 => db에 두 번 접근하므로 비효율적임
  // - delete: 아이템이 존재하면 지우고, 존재하지 않으면 아무 영향이 없음
  async deleteBoard(id: number, user: User): Promise<void> {
    // 자신의 게시글인 경우에만 삭제 가능 (user 추가)
    const result = await this.boardRepository.delete({ id, user });
    // 있는 아이템을 삭제했을 때: DeleteResult { raw: [], affected: 1 }
    // 없는 아이템을 삭제했을 때: DeleteResult { raw: [], affected: 0 }

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   if (!board) {
  //     throw new NotFoundException();
  //   }
  //   board.status = status;
  //   return board;
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
