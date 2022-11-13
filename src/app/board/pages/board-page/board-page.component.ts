import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IColumn } from '../../models/column.model';
import { IBoard } from '../../../main/models/board.model';
import { ColumnApiService } from '../../services/column-api.service';
import { BoardApiService } from '../../../main/services/board-api.service';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  board: IBoard | undefined;

  public columns$: Observable<IColumn[]> | undefined;

  private routeParamsSub: Subscription | undefined;

  private boardSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boardApiService: BoardApiService,
    private columnApiService: ColumnApiService) {
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.paramMap.subscribe((params) => {
      const boardID = params.get('id');
      console.log(boardID);
      console.log(params);
      if (!boardID) return;

      this.boardSub = this.boardApiService.getBoard(boardID).subscribe(board => {
        this.board = board;
      },
      );

      this.columns$ = this.columnApiService.getColumns(boardID);
    });

  }

  ngOnDestroy(): void {
    this.routeParamsSub?.unsubscribe();
    this.boardSub?.unsubscribe();
  }

  navigateBack(): void {
    this.location.back();
  }
}
