import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule }   from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';



import { MatCarouselModule } from '@ngmodule/material-carousel';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CreatorStudioComponent } from 'app/main/creator-studio/creator-studio.component';

import { FuseSidebarModule } from '@fuse/components';
import { editParameterDialog } from './parameter-dialog/parameter-dialog.component';
import { SubmenuDialog } from './submenu-dialog/submenu-dialog.component';


// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';

// color picker
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';



const routes: Routes = [
    {
        path     : 'creatorStudio',
        component: CreatorStudioComponent,
        resolve  : {
        }
    }
];

@NgModule({
    declarations: [
        CreatorStudioComponent,
        editParameterDialog,
        SubmenuDialog,
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatDividerModule,
        MatStepperModule,
        MatListModule,
        MatCarouselModule, 
        MatTooltipModule,
        MatDialogModule,
        MatToolbarModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatCheckboxModule,

        BrowserAnimationsModule,

        FormsModule,
        MatGridListModule,

        DragDropModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,

        Ng5SliderModule,

        ColorPickerModule,



    ],
    providers   : [
    ]
})
export class CreatorStudioModule
{
}
