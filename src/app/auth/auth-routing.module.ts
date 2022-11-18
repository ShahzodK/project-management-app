import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthRoutePaths } from './enums/routes.enum';

const routes: Routes = [
  { path: AuthRoutePaths.LOGIN, component: LoginPageComponent },
  { path: AuthRoutePaths.SIGN_UP, component: SignupPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
