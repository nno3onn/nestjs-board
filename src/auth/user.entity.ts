import {
  BaseEntity,
  Column,
  Entity,
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
}
