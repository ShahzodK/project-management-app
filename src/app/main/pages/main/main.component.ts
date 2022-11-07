import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from './../../services/board.service';
import { BoardApiService } from './../../services/board-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(public translateService: TranslateService, public router: Router, public boardService: BoardService, public api: BoardApiService) { }

  public boardError = false;

  ngOnInit(): void {
    this.api.getBoards().subscribe({
      next: (boards) => {
        this.boardService.boards = boards;
      },
      error: () => this.boardError = true,
    });

  }
}
