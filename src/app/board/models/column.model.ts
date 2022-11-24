export interface IColumn {
  readonly _id: string,
  title: string,
  order: number,
  boardId: string
}

export interface IUpdatedColumn {
  _id: string,
  order: number;
}
