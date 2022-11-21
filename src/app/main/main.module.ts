import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MainRoutingModule } from './main-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardApiService } from './services/board-api.service';
import { AuthInterceptor } from '../core/interceptors/AuthInterceptor';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { BoardItemComponent } from './components/board-item/board-item/board-item.component';
import { CreateBoardFormComponent } from './components/create-board-modal/create-board-form.component';
import { DeleteModalComponent } from './components/delete-board-modal/delete-modal.component';
import { SearchPipe } from './pipes/search.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';

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
    FormsModule,
    MatIconModule,
    MatDialogModule,
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
