import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { selectBoards } from 'src/app/redux/selectors/boards-selector';
import { BoardService } from '../../services/board.service';
import { BoardApiService } from '../../services/board-api.service';
import { getBoards } from '../../../redux/actions/board-action';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(
    public translateService: TranslateService,
    public router: Router,
    public boardService: BoardService,
    public api: BoardApiService,
    private store: Store,
  ) {
  }

  public boardError = false;

  public stateBoards$ = this.store.select(selectBoards);

  public getBoardsSub: Subscription | undefined;

  ngOnInit(): void {
    this.getBoardsSub = this.api.getBoards().subscribe({
      next: (boards) => {
        this.store.dispatch(getBoards({ boards }));
      },
      error: () => this.boardError = true,
    });
  }

  ngOnDestroy(): void {
    this.getBoardsSub?.unsubscribe();
  }

  onBoardClick(ID: string): void {
    this.router.navigate([`main/board/${ID}`]);
  }
}
