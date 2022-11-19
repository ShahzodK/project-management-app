import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MainRoutingModule } from './main-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardApiService } from './services/board-api.service';
import { AuthInterceptor } from '../core/interceptors/AuthInterceptor';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { CreateBoardFormComponent } from './components/create-board-form/create-board-form.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { SearchPipe } from './pipes/search.pipe';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './redux/effects/boards.effects';
import { boardsReducer } from './redux/reducers/boards.reducer';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, '../../assets/locale/', '.json');
}
@NgModule({
  declarations: [
    MainPageComponent,
    BoardItemComponent,
    CreateBoardFormComponent,
    DeleteModalComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
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
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
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
