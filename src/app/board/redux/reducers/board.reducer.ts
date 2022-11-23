import { createReducer, on } from '@ngrx/store';
import { IBoardState } from '../board.model';
import * as BoardActions from '../actions/board.actions';

export const initialState: IBoardState = {
  board: {
    id: '',
    title: '',
    description: '',
    columns: [],
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
  on(BoardActions.fetchColumnsSuccess, (state, { columns }): IBoardState => ({
    ...state,
    columns,
  })),
  on(BoardActions.fetchTasksSuccess, (state, { tasks }): IBoardState => {
    return {
      ...state,
      // написал так потому что пока что в эффекте в mergeMap fetchTasksScucess диспатчится
      // на каждый запрос. Когда исправлю, перезаписать без рест и спред
      tasks: [...state.tasks, ...tasks],
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
    const newColumns = [...state.columns].filter(column => column.id !== columnId);

    return {
      ...state,
      columns: newColumns,
    };
  }),
  on(BoardActions.deleteTaskSuccess, (state, { taskId }): IBoardState => {
    const newTasks = [...state.tasks].filter(task => task.id !== taskId);

    return {
      ...state,
      tasks: newTasks,
    };
  }),
  on(BoardActions.deleteTasksSuccess, (state, { columnId }): IBoardState => {
    const newTasks = [...state.tasks].filter(task => task.columnId !== columnId);

    return {
      ...state,
      tasks: newTasks,
    };
  }),
);
