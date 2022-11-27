import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { SharedModule } from '../shared/shared.module';
import { TeamSvgComponent } from './components/team-svg/team-svg.component';

@NgModule({
  declarations: [
    WelcomePageComponent,
    TeamSvgComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WelcomeRoutingModule,
  ],
})
export class WelcomeModule { }
