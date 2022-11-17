import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from '../../../main/services/board.service';

import { selectIsLogged, selectUserName } from 'src/app/redux/selectors';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userName$ = this.store.select(selectUserName);

  public isLogged$ = this.store.select(selectIsLogged);

  public isWelcomePage: boolean | null = null;

  public isAuthPage: boolean | null = null;

  private URLSub!: Subscription;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private authService: AuthService,
    private boardService: BoardService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.URLSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage = event.urlAfterRedirects.includes('welcome');
        this.isAuthPage = event.urlAfterRedirects.includes('login');
      }
    });
  }

  ngOnDestroy(): void {
    this.URLSub.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
  }

  public toggleModal(): void {
    this.boardService.IsCreateBoardModalVisible = !this.boardService.IsCreateBoardModalVisible;
  }
}

