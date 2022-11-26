import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/board.actions';
import { IBoardState } from '../board.model';
import { IColumn } from '../../models/column.model';
import { ITask } from '../../models/task.model';

export const initialState: IBoardState = {
  board: {
    _id: '',
    title: '',
    owner: '',
    users: [],
  },
  columns: [],
  tasks: [],
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.fetchBoardSuccess, (state, { board }): IBoardState => ({
    ...state,
    board: board,
  })),
  on(BoardActions.fetchColumnsSuccess, (state, { columns }): IBoardState => {
    const sortedColumns = [...columns].sort((a:IColumn, b:IColumn) => a.order - b.order);

    return {
      ...state,
      columns: sortedColumns,
    };
  }),
  on(BoardActions.fetchTasksSuccess, (state, { tasks }): IBoardState => {
    const sortedTasks = [...tasks].sort((a:ITask, b:ITask) => a.order - b.order);
    return {
      ...state,
      tasks: sortedTasks,
    };
  }),
  on(BoardActions.createColumnSuccess, (state, { createdColumn }): IBoardState => {
    return {
      ...state,
      columns: [...state.columns, createdColumn],
    };
  }),
  on(BoardActions.createTaskSuccess, (state, { createdTask }): IBoardState => {

    return {
      ...state,
      tasks: [...state.tasks, createdTask],
    };
  }),
  on(BoardActions.deleteColumnSuccess, (state, { columnId }): IBoardState => {
    const newColumns = [...state.columns].filter(column => column._id !== columnId);

    return {
      ...state,
      columns: newColumns,
    };
  }),
  on(BoardActions.updateColumnOrderSuccess, (state, { updatedColumns }): IBoardState => {
    return {
      ...state,
      columns: updatedColumns,
    };
  }),
  on(BoardActions.updateTaskOrderSuccess, (state, { updatedTasks }): IBoardState => {
    return {
      ...state,
      tasks: [...state.tasks.filter((task: ITask) => task.columnId !== updatedTasks[0].columnId), ...updatedTasks],
    };
  }),
  on(BoardActions.deleteTaskSuccess, (state, { taskId }): IBoardState => {
    const newTasks = [...state.tasks].filter(task => task._id !== taskId);

    return {
      ...state,
      tasks: newTasks,
    };
  }),
  on(BoardActions.deleteTasksAfterColumnDelete, (state, { columnId }): IBoardState => {
    const newTasks = [...state.tasks].filter(task => task.columnId !== columnId);

    return {
      ...state,
      tasks: newTasks,
    };
  }),
  on(BoardActions.updateColumnTitleSuccess, (state, { updatedColumn }): IBoardState => {
    const newColumns = [...state.columns].map(column => {
      if (column._id === updatedColumn._id) {
        column = updatedColumn;
      }

      return column;
    });

    return {
      ...state,
      columns: newColumns,
    };
  }),
);
