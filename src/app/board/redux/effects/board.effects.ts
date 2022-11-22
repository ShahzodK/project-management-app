import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as BoardActions from '../actions/board.actions';
import { BoardApiService } from 'src/app/main/services/board-api.service';
import { of, switchMap } from 'rxjs';
import { ColumnApiService } from '../../services/column-api.service';
import { Store } from '@ngrx/store';
import { selectBoardId } from '../selectors/board.selectors';
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

  public createColumn$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.createColumn),
        switchMap(({ boardId, columnTitle }) =>
          this.columnApiService.createColumn(boardId, columnTitle)),
        concatLatestFrom(() => this.store.select(selectBoardId)),
        switchMap(([, boardId]) =>
          of(
            BoardActions.createColumnSuccess({ boardId }),
            BoardActions.fetchColumns({ boardId }),
          ),
        ),
        catchError(() => of(BoardActions.createColumnFailed())),
      );
  });

  public fetchColumns$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.fetchColumns, BoardActions.createColumnSuccess),
        switchMap(({ boardId }) =>
          this.columnApiService.getColumns(boardId)),
        map(columns => BoardActions.fetchColumnsSuccess({ columns })),
        catchError(() => of(BoardActions.fetchColumnsFailed())),
      );
  });

  // public fetchTasks$ = createEffect(() => {
  //   return this.actions$
  //     .pipe(
  //       ofType(BoardActions.fetchTasks, BoardActions.createTaskSuccess, BoardActions.deleteTaskSuccess),
  //       switchMap(({ boardId, columnId }) =>
  //         this.taskApiService
  //           .getTasks(boardId, columnId)
  //           // of([])
  //           .pipe(
  //             map((tasks) => ({
  //               tasks,
  //               columnId,
  //             }),
  //             ),
  //           ),
  //       ),
  //       map(({ tasks, columnId }) =>
  //         BoardActions.fetchTasksSuccess({ tasks, columnId }),
  //       ),
  //       catchError(() => of(BoardActions.fetchTasksFailed())),
  //     );
  // });

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
          console.log(tasks);
          return BoardActions.fetchTasksSuccess({ tasks });
        }),
        catchError(() => of(BoardActions.fetchTasksFailed())),
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
              map(() => ({ boardId, columnId })),
            ),
        ),
        map(({ boardId, columnId }) => BoardActions.deleteTaskSuccess({ boardId, columnId })),
        catchError(() => of(BoardActions.deleteTaskFailed())),
      );
  });

  public createTask$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.createTask),
        switchMap(({ boardId, columnId, taskTitle, taskDescription, userId }) =>
          this.taskApiService
            .createTask(boardId, columnId, taskTitle, taskDescription, userId)
            .pipe(
              map(() => ({ boardId, columnId, taskTitle, taskDescription })),
            ),
        ),
        map(({ boardId, columnId, taskTitle, taskDescription }) =>
          BoardActions.createTaskSuccess({
            boardId,
            columnId,
            taskTitle,
            taskDescription,
          }),
        ),
        catchError(() => of(BoardActions.createTaskFailed())),
      );
  });
}
