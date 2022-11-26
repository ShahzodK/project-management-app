import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoard, selectColumns } from '../../redux/selectors/board.selectors';
import * as BoardActions from '../../redux/actions/board.actions';
import { selectUserId } from '../../../redux/selectors/app.selectors';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
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
    const columns = [...arraySource];
    const from = this.clamp(fromIndex, columns.length - 1);
    const to = this.clamp(toIndex, columns.length - 1);

    if (from === to) {
      return [];
    }

    const target = columns[from];
    const delta = to < from ? -1 : 1;

    for (let i = from; i !== to; i += delta) {
      columns[i] = columns[i + delta];
    }

    columns[to] = target;
    return columns.map((column, i: number) => {
      return {
        ...column,
        order: i,
      };
    });
  }

}
