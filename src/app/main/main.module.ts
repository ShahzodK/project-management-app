import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MainRoutingModule } from './main-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardApiService } from './services/board-api.service';
import { AuthInterceptor } from '../core/interceptors/AuthInterceptor';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { BoardItemComponent } from './components/board-item/board-item/board-item.component';
import { CreateBoardModalComponent } from './components/create-board-modal/create-board-modal.component';
import { SearchPipe } from './pipes/search.pipe';
import { SharedModule } from '../shared/shared.module';
import { HttpLoaderFactory } from '../app.module';

@NgModule({
  declarations: [
    MainPageComponent,
    BoardItemComponent,
    CreateBoardModalComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
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
  exports: [
  ],
  providers: [
    BoardApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class MainModule { }
