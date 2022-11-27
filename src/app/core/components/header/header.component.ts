import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLogged, selectUserName } from 'src/app/redux/selectors/app.selectors';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { FullRoutePaths } from '../../constants/routes';
import { AppRoutePaths } from '../../enums/routes.enum';
import * as BoardActions from '../../../main/redux/actions/boards.actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { BoardResult, ModalData, ModalResult } from '../../../shared/models/modal.model';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly LOGIN_ROUTE_PATH = FullRoutePaths.LOGIN;

  public readonly SIGN_UP_ROUTE_PATH = FullRoutePaths.SIGN_UP;

  public userName$ = this.store.select(selectUserName);

  public isLogged$ = this.store.select(selectIsLogged);

  public isWelcomePage: boolean | null = null;

  public isAuthPage: boolean | null = null;

  private URLSub!: Subscription;

  public screenWidth: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
    private dialog: MatDialog,
    private userService: UserService,
  ) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  private getScreenSize(): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.URLSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage = event.urlAfterRedirects.includes(AppRoutePaths.WELCOME);
        this.isAuthPage = event.urlAfterRedirects.includes(AppRoutePaths.AUTH);
      }
    });
  }

  ngOnDestroy(): void {
    this.URLSub.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
  }

  public showCreateBoardModal(): void {
    const dialogConfig = new MatDialogConfig<ModalData>();

    dialogConfig.autoFocus = 'dialog';
    dialogConfig.data = {
      title: 'Create Board',
      formFields: [
        {
          label: 'Title',
          name: 'title',
        },
      ],
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((dialogResult: ModalResult<BoardResult>) => {
        if (!dialogResult) return;

        const { title } = dialogResult;
        const owner = this.userService.getUserId();
        const users: string[] = [];

        this.store.dispatch(BoardActions.createBoard({ title, owner, users }));
        this.router.navigate([FullRoutePaths.MAIN]);
      });
  }
}

