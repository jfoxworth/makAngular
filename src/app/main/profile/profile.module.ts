import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Material Items
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
//import { MatSnackBarModule } from '@angular/material';

/* Mak Components */
import { NavbarModule } from '../Shared/navbar/navbar.module';
import { ProfileComponent } from './profile.component';
import { NoUserComponent } from './no-user/no-user.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes : Routes = [
  {
    path:'profile',
    component:ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    NoUserComponent,
    ProfileHeaderComponent,
    ProfileUserComponent,
    ProfileEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NavbarModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports:[RouterModule]
})
export class ProfileModule { }

