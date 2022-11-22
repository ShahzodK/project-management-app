import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ColumnApiService } from './services/column-api.service';
import { TaskApiService } from './services/task-api.service';
import { AuthInterceptor } from '../core/interceptors/AuthInterceptor';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnsListComponent } from './components/columns/columns-list/columns-list.component';
import { ColumnsItemComponent } from './components/columns/columns-item/columns-item.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { TasksItemComponent } from './components/tasks/tasks-item/tasks-item.component';
import { BoardRoutingModule } from './board-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { HttpLoaderFactory } from '../app.module';

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
    BoardRoutingModule,
    SharedModule,
    HttpClientModule,
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
  ],
  providers: [
    ColumnApiService,
    TaskApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class BoardModule { }
