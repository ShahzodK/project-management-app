import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./welcome-page/welcome-page.module')
      .then((mod) => mod.WelcomePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
  },
  { path: '', redirectTo: 'home', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
