import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocaleTogglerComponent } from './components/locale-toggler/locale-toggler.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LocaleTogglerComponent,
    NotFoundPageComponent,
    ProfileMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LocaleTogglerComponent,
    NotFoundPageComponent,
  ],
})
export class CoreModule { }
