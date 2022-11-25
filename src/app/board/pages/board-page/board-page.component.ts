import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoard, selectColumns } from '../../redux/selectors/board.selectors';
import * as BoardActions from '../../redux/actions/board.actions';
import { selectUserId } from '../../../redux/selectors/app.selectors';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IColumn } from '../../models/column.model';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  public board$ = this.store.select(selectBoard);

  public columns$ = this.store.select(selectColumns);

  private routeParamsSub!: Subscription;

  private boardId: string | null = null;

  public userId$ = this.store.select(selectUserId);

  public draggedColumn: IColumn | undefined;

  public columns: IColumn[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.paramMap.subscribe((params) => {
      const boardId = params.get('id')!;

      if (!boardId) throw this.getBoardIdError();

      this.store.dispatch(BoardActions.boardPageOpened({ boardId }));

      this.boardId = boardId;

      this.columns$.subscribe((columns) => {
        if (!columns.length) return;

        this.store.dispatch(BoardActions.fetchTasks({
          boardId: boardId,
          columnIds: columns.map(column => column._id),
        }));
      });
    });
  }

  private getBoardIdError(): Error {
    return new Error("Board don't have an ID: URL doesn't contain board's ID");
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

  public navigateBack(): void {
    this.location.back();
  }

  public reorderColumns(event: CdkDragDrop<string[]>, columns: IColumn[]) {
    const updatedColumns: IColumn[] = this.moveItemInArray(columns, event.previousIndex, event.currentIndex);
    this.store.dispatch(BoardActions.updateColumnOrder({ updatedColumns }));
  }

  public clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }

  public moveItemInArray(arraySource: IColumn[], fromIndex: number, toIndex: number): IColumn[] {
    const array = JSON.parse(JSON.stringify(arraySource));
    const from = this.clamp(fromIndex, array.length - 1);
    const to = this.clamp(toIndex, array.length - 1);

    if (from === to) {
      return [];
    }

    const target = array[from];
    const delta = to < from ? -1 : 1;

    for (let i = from; i !== to; i += delta) {
      array[i] = array[i + delta];
    }

    array.forEach((column: IColumn, i: number) => {
      column.order = i;
    });

    array[to] = target;
    return array.map((column: Partial<Pick<IColumn, 'boardId' | 'title'>> & Omit<IColumn, 'boardId' | 'title'>, i: number) => {
      delete column.boardId;
      delete column.title;
      column.order = i;
      return column;
    });
  }

}
