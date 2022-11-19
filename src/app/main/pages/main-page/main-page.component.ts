import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { selectBoards } from 'src/app/main/redux/selectors/boards.selectors';
import { BoardService } from '../../services/board.service';
import { BoardApiService } from '../../services/board-api.service';
import { AppRoutePaths } from '../../../core/enums/routes.enum';
import * as BoardsActions from '../../redux/actions/boards.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  constructor(
    public translateService: TranslateService,
    public router: Router,
    public boardService: BoardService,
    public api: BoardApiService,
    private store: Store,
  ) {
  }

  public boardError = false;

  public boards$ = this.store.select(selectBoards);

  ngOnInit(): void {
    this.store.dispatch(BoardsActions.fetchBoards());
    // this.getBoardsSub = this.api.getBoards().subscribe({
    //   next: (boards) => {
    //     this.store.dispatch(fetchBoards({ boards }));
    //   },
    //   error: () => this.boardError = true,
    // });
  }

  onBoardClick(ID: string): void {
    this.router.navigate([`${AppRoutePaths.BOARD}/${ID}`]);
  }
}
