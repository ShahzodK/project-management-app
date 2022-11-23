import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as BoardActions from '../actions/board.actions';
import { BoardApiService } from 'src/app/main/services/board-api.service';
import { of, switchMap } from 'rxjs';
import { ColumnApiService } from '../../services/column-api.service';
import { Store } from '@ngrx/store';
import { selectTasks } from '../selectors/board.selectors';
import { TaskApiService } from '../../services/task-api.service';

@Injectable({
  providedIn: 'root',
})

export class BoardEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private boardApiService: BoardApiService,
    private columnApiService: ColumnApiService,
    private taskApiService: TaskApiService,
  ) {
  }

  public boardPageOpened$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.boardPageOpened),
        switchMap(({ boardId }) => of(
          BoardActions.fetchBoard({ boardId }),
          BoardActions.fetchColumns({ boardId }),
        )),
      );
  });

  public fetchBoard$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.fetchBoard),
        switchMap(({ boardId }) => this.boardApiService.getBoard(boardId)),
        map(board => BoardActions.fetchBoardSuccess({ board })),
        catchError(() => of(BoardActions.fetchBoardFailed())),
      );
  });

  public fetchColumns$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.fetchColumns),
        switchMap(({ boardId }) =>
          this.columnApiService.getColumns(boardId)),
        map(columns => BoardActions.fetchColumnsSuccess({ columns })),
        catchError(() => of(BoardActions.fetchColumnsFailed())),
      );
  });

  public createColumn$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.createColumn),
        switchMap(({ boardId, columnTitle }) =>
          this.columnApiService.createColumn(boardId, columnTitle)),
        map((createdColumn) =>
          BoardActions.createColumnSuccess({ createdColumn }),
        ),
        catchError(() => of(BoardActions.createColumnFailed())),
      );
  });

  public deleteColumn$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.deleteColumn),
        switchMap(({ boardId, columnId }) =>
          this.columnApiService.deleteColumn(boardId, columnId)
            .pipe(
              map(() => ({ columnId, boardId })),
            ),
        ),
        switchMap(({ columnId, boardId }) =>
          of(
            BoardActions.deleteColumnSuccess({ columnId }),
            BoardActions.deleteTasks({ columnId, boardId }),
          )),
        catchError(() => of(BoardActions.fetchColumnsFailed())),
      );
  });

  public fetchTasks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.fetchTasks),
        mergeMap(({ boardId, columnIds }) => {
          return columnIds.map(columnId => {
            return this.taskApiService
              .getTasks(boardId, columnId);
          });
        }),
        mergeMap((tasks) => tasks),
        map((tasks) => {
          return BoardActions.fetchTasksSuccess({ tasks });
        }),
        catchError(() => of(BoardActions.fetchTasksFailed())),
      );
  });

  public createTask$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.createTask),
        switchMap(({ boardId, columnId, taskTitle, taskDescription, userId }) =>
          this.taskApiService
            .createTask(boardId, columnId, taskTitle, taskDescription, userId),
        ),
        map((createdTask) =>
          BoardActions.createTaskSuccess({
            createdTask,
          }),
        ),
        catchError(() => of(BoardActions.createTaskFailed())),
      );
  });

  public deleteTask$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.deleteTask),
        switchMap(({ boardId, columnId, taskId }) =>
          this.taskApiService
            .deleteTask(boardId, columnId, taskId)
            .pipe(
              map(() => ({ taskId })),
            ),
        ),
        map(({ taskId }) => BoardActions.deleteTaskSuccess({ taskId })),
        catchError(() => of(BoardActions.deleteTaskFailed())),
      );
  });

  public deleteTasks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.deleteTasks),
        concatLatestFrom(() => this.store.select(selectTasks)),
        mergeMap(([{ boardId, columnId }, tasks]) => {
          const tasksToDelete = tasks.filter(task => task.columnId === columnId);

          return tasksToDelete.map(task => {
            return this.taskApiService
              .deleteTask(boardId, task.columnId, task.id)
              .pipe(
                map(() => ({ columnId })),
              );
          });
        }),
        mergeMap((columnId) => columnId),
        map(({ columnId }) => BoardActions.deleteTasksSuccess({ columnId })),
        catchError(() => of(BoardActions.deleteTaskFailed())),
      );
  });
}
