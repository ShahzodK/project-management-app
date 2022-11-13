import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ColumnApiService } from './services/column-api.service';
import { TaskApiService } from './services/task-api.service';
import { Interceptor } from '../core/services/interceptor';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnsListComponent } from './components/columns/columns-list/columns-list.component';
import { ColumnsItemComponent } from './components/columns/columns-item/columns-item.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { TasksItemComponent } from './components/tasks/tasks-item/tasks-item.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BoardPageComponent,
    ColumnsListComponent,
    ColumnsItemComponent,
    TasksListComponent,
    TasksItemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [
    ColumnApiService,
    TaskApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
})
export class BoardModule { }
