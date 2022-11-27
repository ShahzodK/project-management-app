import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardRoutingModule } from './board-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { HeaderComponent } from './components/header/header.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from './redux/effects/board.effects';
import { boardReducer } from './redux/reducers/board.reducer';

import { SortByOrderPipe } from './pipes/sort-by-order.pipe';
import { ColumnApiService } from './services/column-api.service';
import { TaskApiService } from './services/task-api.service';

@NgModule({
  declarations: [
    BoardPageComponent,
    ColumnComponent,
    TaskComponent,
    HeaderComponent,
    SortByOrderPipe,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    StoreModule.forFeature('board', boardReducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
  providers: [

    ColumnApiService,
    TaskApiService,
  ],
})
export class BoardModule {
}
