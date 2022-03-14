export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus; // 공개 글(PUBLIC)인지, 비공개 글(PRIVATE)인지. 두 값만 나올 수 있음
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
