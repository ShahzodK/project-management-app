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

import { ReactiveFormsModule } from '@angular/forms';
import { BoardApiService } from './services/board-api.service';
import { Interceptor } from '../core/services/interceptor';
import { MainComponent } from './pages/main/main.component';
import { MissingTranslationService } from '../shared/services/missing-translation.service';
import { BoardItemComponent } from './components/board-item/board-item/board-item.component';
import { CreateBoardFormComponent } from './components/create-board-form/create-board-form.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { SearchPipe } from './pipes/search.pipe';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, '../../assets/locale/', '.json');
}
@NgModule({
  declarations: [
    MainComponent,
    BoardItemComponent,
    CreateBoardFormComponent,
    DeleteModalComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MainRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
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
    BoardApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
})
export class MainModule { }
