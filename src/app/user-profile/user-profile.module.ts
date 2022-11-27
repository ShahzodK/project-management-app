import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from './services/user-api.service';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EditProfilePageComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    UserApiService,
  ],
})
export class UserProfileModule { }
