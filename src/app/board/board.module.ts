import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BoardRoutingModule } from './board-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from './redux/effects/board.effects';
import { boardReducer } from './redux/reducers/board.reducer';

import { HttpLoaderFactory } from '../app.module';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { SortByOrderPipe } from './pipes/sort-by-order.pipe';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';

@NgModule({
  declarations: [
    BoardPageComponent,
    ColumnComponent,
    TaskComponent,
    HeaderComponent,
    CreateColumnModalComponent,
    CreateTaskModalComponent,
    SortByOrderPipe,
    EditTaskModalComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule,
    FormsModule,
    TranslateModule,
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
    EffectsModule.forFeature([BoardEffects]),
  ],
})
export class BoardModule {
}
