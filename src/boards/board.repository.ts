import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

// Repository
// - entity 개체와 함께 작동
// - entity 찾기(find), 삽입(insert), 업데이트(update), 삭제(delete) 등을 처리함
// - Client -> Request -> Controller -> Service (-> Repository(DB와 관련된 일) -> Service) -> Controller -> Response -> Client

// EntityRepository
// - 클래스를 사용자 정의(custom) 저장소로 선언함
// - 사용자 지정 저장소는 일부 특정 entity를 관리하거나 혹은 일반 저장소일 수 있음
// - 즉, 이제 BoardRepository가 저장소임을 선언해줌
@EntityRepository(Board)
// extends Repository: Find, Insert, Delete 등 entity를 컨트롤 할 수 있게 됨
// 저장소는 Board entity를 제어함
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    // create({}): Board entity를 생성함
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    // save([]): 생성된 객체를 DB에 저장하여 row를 생성함
    await this.save(board);
    return board;
  }
}

// 생성 후에는 다른 곳에서도 사용할 수 있도록 하기 위해 board.module에 imports에 추가해줌
