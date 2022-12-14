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
import { updateArrayOrder } from 'src/app/shared/consts/updateArrayOrder';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  public board$ = this.store.select(selectBoard);

  public columns$ = this.store.select(selectColumns);

  public userId$ = this.store.select(selectUserId);

  private routeParamsSub!: Subscription;


  public draggedColumn: IColumn | undefined;

  public columns: IColumn[] | undefined;

  public columnsList: IColumn[] | undefined;

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
    this.columns$.subscribe((columns) => {
      this.columnsList = [...columns];
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
    if (event.previousIndex !== event.currentIndex) {
      const updatedColumns: IColumn[] = updateArrayOrder(columns, event.previousIndex, event.currentIndex);
      this.store.dispatch(BoardActions.updateColumnOrder({ updatedColumns }));
    }

  }

}
