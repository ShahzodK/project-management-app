import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { AuthInterceptor } from '../core/interceptors/AuthInterceptor';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardRoutingModule } from './board-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from '../main/redux/effects/boards.effects';
import { boardReducer } from './redux/reducers/board.reducer';
import { HttpLoaderFactory } from '../app.module';

@NgModule({
  declarations: [
    BoardPageComponent,
    ColumnComponent,
    TaskComponent,
    HeaderComponent,
    CreateColumnModalComponent,
    CreateTaskModalComponent,
    DeleteTaskModalComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule,
    HttpClientModule,
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
    StoreModule.forFeature('board', boardReducer),
    EffectsModule.forFeature([BoardsEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class BoardModule { }
