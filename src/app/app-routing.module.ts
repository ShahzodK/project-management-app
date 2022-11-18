import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { AuthLoggedGuard } from './auth/guards/auth-logged.guard';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module')
      .then((mod) => mod.WelcomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule),
    canActivate: [AuthLoggedGuard],
    canLoad: [AuthLoggedGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((mod) => mod.MainModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then((mod) => mod.BoardModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then((mod) => mod.UserProfileModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '', redirectTo: 'welcome', pathMatch: 'full',
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
