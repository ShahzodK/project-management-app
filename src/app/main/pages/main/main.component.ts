import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from './../../services/board.service';
import { BoardApiService } from './../../services/board-api.service';
import { saveBoards } from './../../../redux/actions/board-action';
import { selectBoards } from 'src/app/redux/selectors/boards-selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(
    public translateService: TranslateService,
    public router: Router,
    public boardService: BoardService,
    public api: BoardApiService,
    private store: Store,
  ) { }

  public boardError = false;

  public stateBoards$ = this.store.select(selectBoards);


  ngOnInit(): void {
    this.api.getBoards().subscribe({
      next: (boards) => {
        this.store.dispatch(saveBoards({ boards }));
        this.boardService.boards = boards;
      },
      error: () => this.boardError = true,
    });
  }
}
