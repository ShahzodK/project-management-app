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

  private boardId: string | null = null;

  public userId$ = this.store.select(selectUserId);

  public draggedColumn: IColumn | undefined;

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

  public reorderColumns(event: CdkDragDrop<string[]>) {
    // console.log(event.previousContainer);
    const column = JSON.parse(JSON.stringify(event.item.data));
    console.log(column);
    const currentId = event.currentIndex;
    column.order = currentId;
    this.store.dispatch(BoardActions.updateColumnOrder(column));
  }
}
