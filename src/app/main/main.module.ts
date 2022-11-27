import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BoardApiService } from './services/board-api.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardItemComponent } from './components/board-item/board-item.component';

import { SearchPipe } from './pipes/search.pipe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './redux/effects/boards.effects';
import { boardsReducer } from './redux/reducers/boards.reducer';

@NgModule({
  declarations: [
    MainPageComponent,
    BoardItemComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
  ],
  providers: [
    BoardApiService,
  ],
})
export class MainModule { }
