import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginRoutingModule } from './login-routing.module';
import { HttpLoaderFactory } from '../app.module';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { UserService } from '../shared/services/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
    imports: [
        CommonModule,
        DirectivesModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        MatSnackBarModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
            useDefaultLang: false,
        }),
        MatIconModule,
    ],
  providers: [
    UserService,
  ],
})
export class LoginModule { }
