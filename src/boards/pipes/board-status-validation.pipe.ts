import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

// 커스텀 파이프 구현
// PipeTransform: 모든 파이프에서 구현해줘야만 하는 인터페이스
export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  // transform 메서드: 모든 파이프가 이 메서드를 필요로 함
  // value: 처리가 된 인자의 값
  // metadata: 인자에 대한 메타 데이터를 포함한 객체
  transform(value: any, metadata: ArgumentMetadata) {
    // value => 받은 status값. 모두 대문자로 변환
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status`);
    }

    // return 값은 라우트 핸들러로 전달됨
    // -> 만약, 예외(Exception)이 발생하면 클라이언트에 바로 전달됨
    return value;
  }

  // 받은 값의 타입은 any 아무거나 들어올 수 있음
  private isStatusValid(status: any) {
    // status가 StatusOptions(PUBLIC, PRIVATE)에 있는 값인지 봄
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
