import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/guards/login.guard';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./welcome/welcome.module')
      .then((mod) => mod.WelcomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((mod) => mod.MainModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  },
  {
    path: 'main/board',
    loadChildren: () => import('./board/board.module').then((mod) => mod.BoardModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  },
  { path: '', redirectTo: 'home', pathMatch:'full' },
  {
    path: 'edit-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then((mod) => mod.UserProfileModule),
  },
  {
    path: '', redirectTo: 'home', pathMatch:'full',
  },
  {
    path: '**', pathMatch:'full', component: NotFoundPageComponent, // 404 page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
