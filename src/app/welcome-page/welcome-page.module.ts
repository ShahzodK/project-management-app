import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageRoutingModule } from './welcome-page-routing.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    WelcomePageComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    WelcomePageRoutingModule,
  ],
})
export class WelcomePageModule { }
