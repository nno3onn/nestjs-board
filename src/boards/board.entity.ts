import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board-status.enum';

// TypeORM
// - 작성한 class를 DB의 table로 변환해줌
// - 따라서 class를 생성하고, 그 안에 column들을 정의해주면 됨
// - 아래와 같이 작성하면, TypeORM이 DB의 Board entity에 해당하는 테이블을 자동으로 생성하고 Board로 이름을 지정해줌

// Entity: Board class가 entity임을 나타냄 (=CREATE TABLE board)
@Entity()
export class Board extends BaseEntity {
  // PrimaryGeneratedColumn: Board entity의 기본 키 열임을 나타냄
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}
