import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./welcome-page/welcome-page.module')
      .then((mod) => mod.WelcomePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((mod) => mod.MainModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'main/board',
    loadChildren: () => import('./board/board.module').then((mod) => mod.BoardModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then((mod) => mod.UserProfileModule),
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
