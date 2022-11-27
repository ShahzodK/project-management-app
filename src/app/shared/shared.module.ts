import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoDataSvgComponent } from './components/no-data-svg/no-data-svg.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotifyService } from './services/notify.service';
import { NotFoundSvgComponent } from './components/not-found-svg/not-found-svg.component';

@NgModule({
  declarations: [
    NoDataSvgComponent,
    NotFoundSvgComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    NoDataSvgComponent,
    NotFoundSvgComponent,
  ],
  providers: [
    NotifyService,
  ],
})
export class SharedModule { }
