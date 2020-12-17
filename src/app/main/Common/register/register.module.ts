

// Common Angular Items
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


// Mak Components
import { RegisterComponent } from './register.component';


@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports     : [

      CommonModule,
      FlexLayoutModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,

    ]
})
export class RegisterModule
{
}
