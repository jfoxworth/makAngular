
import { MatExpansionModule } from '@angular/material/expansion';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule} from '@angular/material/select';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatIconModule} from '@angular/material/icon';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSliderModule} from '@angular/material/slider';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDividerModule} from '@angular/material/divider';

import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { BrowserModule } from '@angular/platform-browser';
import { FuseSharedModule } from '@fuse/shared.module';

import { DesignStudioService } from 'app/main/services/design-studio.service';
import { DesignStudioComponent } from 'app/main/design-studio/design-studio.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';




const routes = [
    {
        path     : 'designStudio/design/:designId',
        component: DesignStudioComponent,
    },
    {
        path     : 'designStudio/project/:projectId',
        component: DesignStudioComponent,
    },
    {
        path     : 'designStudio/:designId',
        component: DesignStudioComponent,
    },
    {
        path     : 'designStudio',
        component: DesignStudioComponent,
    }
];

@NgModule({
    declarations: [
        DesignStudioComponent,
        SidebarComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatExpansionModule,
        FuseSidebarModule,
        FuseSharedModule,


        // Material
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatSliderModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatDividerModule,
        MatSelectModule,
        MatGridListModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,


        Ng5SliderModule,



    ],
    providers   : [
    ]
})
export class DesignStudioModule
{
}
