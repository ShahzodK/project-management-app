import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { DirectivesModule } from '../shared/directives/directives.module';


@NgModule({
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule { }
