import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { AuthLoggedGuard } from './auth/guards/auth-logged.guard';
import { AppRoutePaths } from './core/enums/routes.enum';

const routes: Routes = [
  {
    path: AppRoutePaths.WELCOME,
    loadChildren: () => import('./welcome/welcome.module')
      .then((mod) => mod.WelcomeModule),
  },
  {
    path: AppRoutePaths.AUTH,
    loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule),
    canActivate: [AuthLoggedGuard],
    canLoad: [AuthLoggedGuard],
  },
  {
    path: AppRoutePaths.MAIN,
    loadChildren: () => import('./main/main.module').then((mod) => mod.MainModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: AppRoutePaths.BOARD,
    loadChildren: () => import('./board/board.module').then((mod) => mod.BoardModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: AppRoutePaths.EDIT_PROFILE,
    loadChildren: () => import('./user-profile/user-profile.module').then((mod) => mod.UserProfileModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '', redirectTo: AppRoutePaths.MAIN, pathMatch: 'full',
  },
  {
    path: '**', component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
