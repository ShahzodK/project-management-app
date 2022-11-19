import { IColumn } from '../../board/models/column.model';

export interface IBoard {
  id: string;
  title: string;
  description: string;
  columns?: IColumn[];
}
