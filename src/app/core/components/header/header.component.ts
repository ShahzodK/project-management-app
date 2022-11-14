import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from '../../../main/services/board.service';
import { resetUser } from 'src/app/redux/actions';

import { selectIsLogged, selectUserName } from 'src/app/redux/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userName$ = this.store.select(selectUserName);

  isLogged$ = this.store.select(selectIsLogged);

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private boardService: BoardService,
    private store: Store,
  ) {
  }

  public logout() {
    localStorage.removeItem('authToken');
    this.store.dispatch(resetUser());
    this.router.navigate(['login']);
  }

  public toggleModal(): void {
    this.boardService.IsCreateBoardModalVisible = !this.boardService.IsCreateBoardModalVisible;
  }

}
