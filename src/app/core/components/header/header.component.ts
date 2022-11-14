import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from '../../../main/services/board.service';
import { resetUser } from 'src/app/redux/actions';

import { selectIsLogged, selectUserName } from 'src/app/redux/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName$ = this.store.select(selectUserName);

  isLogged$ = this.store.select(selectIsLogged);

  public isWelcomePage: boolean | null = null;

  private URLSub!: Subscription;


  constructor(
    private translateService: TranslateService,
    private router: Router,
    private boardService: BoardService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.URLSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage = event.url.includes('home');
      }
    },
    );
  }

  ngOnDestroy(): void {
    this.URLSub.unsubscribe();
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
