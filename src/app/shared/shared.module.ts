import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSectionComponent } from './components/form-section/form-section/form-section.component';



@NgModule({
  declarations: [
    FormSectionComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormSectionComponent,
  ],
})
export class SharedModule { }
