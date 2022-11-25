import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoard, selectColumns } from '../../redux/selectors/board.selectors';
import * as BoardActions from '../../redux/actions/board.actions';
import { selectUserId } from '../../../redux/selectors/app.selectors';


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

}
