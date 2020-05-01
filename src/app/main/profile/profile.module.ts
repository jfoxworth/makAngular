import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/main/profile/profile.service';
import { ProfileComponent } from './profile.component';
import { ProfileAboutComponent } from 'app/main/profile/tabs/about/about.component';
import { ProfileTimelineComponent } from 'app/main/profile/tabs/timeline/timeline.component';
import { ProfilePhotosVideosComponent } from 'app/main/profile/tabs/photos-videos/photos-videos.component';
import { CompaniesComponent } from './tabs/companies/companies.component';
import { EditBioDialog } from 'app/main/profile/edit-dialog/edit-dialog.component';


const routes = [
    {
        path     : 'profile',
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileAboutComponent,
        ProfileTimelineComponent,
        ProfilePhotosVideosComponent,
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


        FuseSharedModule
    ],
    exports     : [
        ProfileComponent
    ],
    providers   : [
        ProfileService
    ]
})

export class ProfileModule
{
}

