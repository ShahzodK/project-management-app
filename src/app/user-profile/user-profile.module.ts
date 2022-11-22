import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from './services/user-api.service';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { TranslateLoader, TranslateModule, MissingTranslationHandler } from '@ngx-translate/core';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { SharedModule } from '../shared/shared.module';
import { HttpLoaderFactory } from '../app.module';

@NgModule({
  declarations: [
    EditProfilePageComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
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
    UserApiService,
  ],
})
export class UserProfileModule { }
