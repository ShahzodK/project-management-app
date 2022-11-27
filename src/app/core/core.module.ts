import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LocaleTogglerComponent } from './components/locale-toggler/locale-toggler.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LocaleTogglerComponent,
    NotFoundPageComponent,
    ConfirmModalComponent,
    ProfileMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
      useDefaultLang: false,
    }),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LocaleTogglerComponent,
    NotFoundPageComponent,
  ],
})
export class CoreModule { }
