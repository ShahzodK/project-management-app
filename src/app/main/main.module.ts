import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BoardApiService } from './services/board-api.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreateBoardModalComponent } from './components/create-board-modal/create-board-modal.component';
import { BoardItemComponent } from './components/board-item/board-item.component';

import { SearchPipe } from './pipes/search.pipe';

import { HttpLoaderFactory } from '../app.module';
import { MissingTranslationService } from '../shared/services/missing-translation.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './redux/effects/boards.effects';
import { boardsReducer } from './redux/reducers/boards.reducer';

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
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
  ],
  providers: [
    BoardApiService,
  ],
})
export class MainModule { }
