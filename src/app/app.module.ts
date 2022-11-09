import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './redux';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';

import { environment } from '../environments/environment';
import { WelcomePageModule } from './welcome-page/welcome-page.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MissingTranslationService } from './shared/services/missing-translation.service';
import { Interceptor } from './core/services/interceptor';
import { UserService } from './shared/services/user.service';
import { FooterComponent } from './core/components/footer/footer.component';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
      useDefaultLang: false,
    }),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    WelcomePageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
