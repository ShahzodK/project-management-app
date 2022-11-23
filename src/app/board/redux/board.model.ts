import { IBoard } from '../../main/models/board.model';
import { IColumn } from '../models/column.model';
import { ITask } from '../models/task.model';

export interface IBoardState {
  board: IBoard,
  columns: IColumn[],
  tasks: ITask[]
}
