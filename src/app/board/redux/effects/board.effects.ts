import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map } from 'rxjs/operators';
import * as BoardActions from '../actions/board.actions';
import { BoardApiService } from 'src/app/main/services/board-api.service';
import { of, switchMap } from 'rxjs';
import { ColumnApiService } from '../../services/column-api.service';
import { Store } from '@ngrx/store';
import { selectColumns } from '../selectors/board.selectors';
import { TaskApiService } from '../../services/task-api.service';
import { IColumn } from '../../models/column.model';
import { NotifyService } from '../../../shared/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private notifyService: NotifyService,
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
          this.columnApiService.getColumns(boardId)
            .pipe(
              map((columns) => ({ columns, boardId })),
            ),
        ),
        switchMap(({ columns, boardId }) => of(
          BoardActions.fetchColumnsSuccess({ columns }),
          BoardActions.fetchTasks({
            columnIds: columns.map((column: IColumn) => column._id),
            boardId,
          }),
        )),
        catchError(() => of(BoardActions.fetchColumnsFailed())),
      );
  });

  public createColumn$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.createColumn),
        concatLatestFrom(() => this.store.select(selectColumns)),
        switchMap(([{ column }, columns]) => {
          const order = columns.length;

          return this.columnApiService.createColumn({
            ...column,
            order,
          });
        }),
        map((createdColumn) => {
          this.notifyService.success();

          return BoardActions.createColumnSuccess({ createdColumn });
        }),
        catchError((error: HttpErrorResponse) => {
          this.notifyService.error(error);

          return of(BoardActions.createColumnFailed());
        }),
      );
  });

  public deleteColumn$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.deleteColumn),
        switchMap(({ boardId, columnId }) =>
          this.columnApiService.deleteColumn(boardId, columnId)
            .pipe(
              map(() => ({ columnId })),
            ),
        ),
        switchMap(({ columnId }) => {
          this.notifyService.success();

          return of(
            BoardActions.deleteColumnSuccess({ columnId }),
            // когда удаляешь колонку, ее таски сами удаляются сервером
            BoardActions.deleteTasksAfterColumnDelete({ columnId }),
          );
        }),
        catchError((error) => {
          this.notifyService.error(error);

          return of(BoardActions.fetchColumnsFailed());
        }),
      );
  });

  public updateColumnTitle$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.updateColumnTitle),
        switchMap(({ newColumn }) =>
          this.columnApiService.updateColumn(newColumn),
        ),
        switchMap((updatedColumn) => {
          this.notifyService.success();

          return of(
            BoardActions.updateColumnTitleSuccess({ updatedColumn }),
          );
        }),
        catchError((error) => {
          this.notifyService.error(error);

          return of(BoardActions.updateColumnTitleFailed());
        }),
      );
  });

  public fetchTasks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.fetchTasks),
        switchMap(({ boardId }) => {

          return this.taskApiService
            .getTasksSet(boardId);
        }),
        map((tasks) => BoardActions.fetchTasksSuccess({ tasks })),
        catchError(() => of(BoardActions.fetchTasksFailed())),
      );
  });

  public createTask$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.createTask),
        switchMap(({ task }) =>
          this.taskApiService.createTask(task)),
        map((createdTask) => {
          this.notifyService.success();

          return BoardActions.createTaskSuccess({
            createdTask,
          });
        },
        ),
        catchError((error) => {
          this.notifyService.error(error);
          return of(BoardActions.createTaskFailed());
        }),
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
        map(({ taskId }) => {
          this.notifyService.success();

          return BoardActions.deleteTaskSuccess({ taskId });
        }),
        catchError((error) => {
          this.notifyService.error(error);

          return of(BoardActions.deleteTaskFailed());
        }),
      );
  });
}
