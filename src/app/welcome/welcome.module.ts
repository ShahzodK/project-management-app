import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { TranslateLoader, TranslateModule, MissingTranslationHandler } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { SharedModule } from '../shared/shared.module';
import { HttpLoaderFactory } from '../app.module';
import { TeamSvgComponent } from './components/team-svg/team-svg.component';

@NgModule({
  declarations: [
    WelcomePageComponent,
    TeamSvgComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WelcomeRoutingModule,
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
})
export class WelcomeModule { }
