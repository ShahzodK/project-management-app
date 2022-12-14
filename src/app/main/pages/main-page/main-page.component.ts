import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoards } from 'src/app/main/redux/selectors/boards.selectors';
import { AppRoutePaths } from '../../../core/enums/routes.enum';
import * as BoardsActions from '../../redux/actions/boards.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store,
  ) {
  }

  public boardError = false;

  public boards$ = this.store.select(selectBoards);

  ngOnInit(): void {
    this.store.dispatch(BoardsActions.fetchBoards());
  }

  onBoardClick(ID: string): void {
    this.router.navigate([`${AppRoutePaths.BOARD}/${ID}`]);
  }
}
