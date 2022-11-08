import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from './../../services/board.service';
import { BoardApiService } from './../../services/board-api.service';
import { getBoards } from './../../../redux/actions/board-action';
import { selectBoards } from 'src/app/redux/selectors/boards-selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(
    public translateService: TranslateService,
    public router: Router,
    public boardService: BoardService,
    public api: BoardApiService,
    private store: Store,
  ) { }

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
}
