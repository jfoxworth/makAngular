import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileComponent } from './profile.component';
import { ProfileAboutComponent } from 'app/main/profile/tabs/about/about.component';
import { CompaniesComponent } from './tabs/companies/companies.component';
import { EditBioDialog } from 'app/main/profile/edit-dialog/edit-dialog.component';

import { CommonModule } from '@angular/common';




const routes: Routes = [
    {
        path     : 'profile',
        component: ProfileComponent,
        resolve  : {
        }
    },
    {
        path     : 'profile/:id',
        component: ProfileComponent,
        resolve  : {
        }
    }
];


@NgModule({
    declarations: [
        ProfileComponent,
        ProfileAboutComponent,
        CompaniesComponent,
        EditBioDialog,
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatDialogModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        CommonModule,
        MatTooltipModule,


        FuseSharedModule
    ],
    exports     : [
        ProfileComponent
    ],
    providers   : [

    ]
})

export class ProfileModule
{
}

