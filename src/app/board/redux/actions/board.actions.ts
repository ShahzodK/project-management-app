import { createAction, props } from '@ngrx/store';
import { IBoard } from '../../../main/models/board.model';
import { IColumn } from '../../models/column.model';
import { ITask } from '../../models/task.model';

export const boardPageOpened = createAction(
  '[Board] Page Opened',
  props<{ boardId: string }>(),
);

export const fetchBoard = createAction(
  '[Board] Fetch',
  props<{ boardId: string }>(),
);

export const fetchBoardSuccess = createAction(
  '[Board] Fetch Success',
  props<{ board: IBoard }>(),
);

export const fetchBoardFailed = createAction(
  '[Board] Fetch Failed',
);

export const fetchColumns = createAction(
  '[Board] Fetch Columns',
  props<{ boardId: string }>(),
);

export const fetchColumnsSuccess = createAction(
  '[Board] Fetch Columns Success',
  props<{ columns: IColumn[] }>(),
);

export const fetchColumnsFailed = createAction(
  '[Board] Fetch Columns Failed',
);

export const createColumn = createAction(
  '[Board] Create Column',
  props<{ column: Omit<IColumn, '_id' | 'order'> }>(),
);

export const createColumnSuccess = createAction(
  '[Board] Create Column Success',
  props<{ createdColumn: IColumn }>(),
);

export const createColumnFailed = createAction(
  '[Board] Create Column Failed',
);

export const updateColumnOrderInServer = createAction(
  '[Board] Update Column order in server',
  props<{ updatedColumnsForRequest: Partial<Pick<IColumn, 'boardId' | 'title'>> & Omit<IColumn, 'boardId' | 'title'>[] }>(),
);

export const updateColumnOrder = createAction(
  '[Board] Update Column order',
  props<{ updatedColumns: IColumn[] }>(),
);

export const updateColumnOrderSuccess = createAction(
  '[Board] Update Column order Success',
  props<{ updatedColumns: IColumn[] }>(),
);

export const updateColumnOrderFailed = createAction(
  '[Board] Update Column order Failed',
);

export const deleteColumn = createAction(
  '[Board] Delete Column',
  props<{ boardId: string, columnId: string }>(),
);

export const deleteColumnSuccess = createAction(
  '[Board] Delete Column Success',
  props<{ columnId: string }>(),
);

export const deleteColumnFailed = createAction(
  '[Board] Delete Column Failed',
);

export const updateColumnTitle = createAction(
  '[Board] Update Column Title',
  props<{ newColumn: IColumn }>(),
);

export const updateColumnTitleSuccess = createAction(
  '[Board] Update Column Title Success',
  props<{ updatedColumn: IColumn }>(),
);

export const updateColumnTitleFailed = createAction(
  '[Board] Update Column Title Failed',
);

export const fetchTasks = createAction(
  '[Board] Fetch Tasks',
  props<{ boardId: string, columnIds: string[] }>(),
);

export const fetchTasksSuccess = createAction(
  '[Board] Fetch Tasks Success',
  props<{ tasks: ITask[] }>(),
);

export const fetchTasksFailed = createAction(
  '[Board] Fetch Tasks Failed',
);

export const deleteTask = createAction(
  '[Board] Delete Task',
  props<{ boardId: string, columnId: string, taskId: string }>(),
);

export const deleteTaskSuccess = createAction(
  '[Board] Delete Task Success',
  props<{ taskId: string }>(),
);

export const deleteTaskFailed = createAction(
  '[Board] Delete Task Failed',
);

export const createTask = createAction(
  '[Board] Create Task',
  props<{
    task: Omit<ITask, '_id'>,
  }>(),
);

export const createTaskSuccess = createAction(
  '[Board] Create Task Success',
  props<{
    createdTask: ITask,
  }>(),
);

export const createTaskFailed = createAction(
  '[Board] Create Task Failed',
);

export const updateTaskOrderInServer = createAction(
  '[Board] Update Task order in server',
  props<{ updatedTasksForRequest: ITask[] }>(),
);

export const updateTaskOrder = createAction(
  '[Board] Update Task order',
  props<{ updatedTasks: ITask[] }>(),
);

export const updateTaskOrderSuccess = createAction(
  '[Board] Update Task order Success',
  props<{ updatedTasks: ITask[] }>(),
);

export const updateTaskOrderFailed = createAction(
  '[Board] Update Task order Failed',
);

export const deleteTasksAfterColumnDelete = createAction(
  '[Board] Delete Tasks After Delete Column',
  props<{ columnId: string }>(),
);

export const updateTask = createAction(
  '[Board] Update Task',
  props<{
    newTask: ITask,
  }>(),
);

export const updateTaskSuccess = createAction(
  '[Board] Update Task Success',
  props<{
    updatedTask: ITask,
  }>(),
);

export const updateTaskFailed = createAction(
  '[Board] Update Task Failed',
);
