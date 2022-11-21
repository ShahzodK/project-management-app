import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth.service';
import { HttpLoaderFactory } from '../app.module';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { UserService } from '../shared/services/user.service';


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
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
      useDefaultLang: false,
    }),
  ],
  providers: [
    AuthService,
    UserService,
  ],
})
export class AuthModule { }
