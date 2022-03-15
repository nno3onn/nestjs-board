import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
// Unique: username이 유일한 값으로 정의해줌
// - 그러면 이제 만약 같은 이름을 가진 유저가 있다면 에러를 던져주고 저장 안함
//{
//   "statusCode": 500,
//   "message": "Internal server error"
// }
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // 데이터 관계 형성
  // - 게시글을 누가 생성했는지 알기 위해, 유저와 게시물 데이터 사이 관계를 형성함
  // - 관계를 형성하기 위해선 엔티티에 서로간의 필드를 넣어야 함
  // - type: 관계 형성할 entity 작성
  // - 두 번째 파라미터: 관계 형성할 entity의 column 작성
  // - eager: true - user를 가져올 때 board 데이터도 함께 가져오겠다
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
