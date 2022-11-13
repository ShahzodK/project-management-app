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
import { BoardRoutingModule } from './board-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    BoardPageComponent,
    ColumnsListComponent,
    ColumnsItemComponent,
    TasksListComponent,
    TasksItemComponent,
    HeaderComponent,
    CreateColumnModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BoardRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
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
