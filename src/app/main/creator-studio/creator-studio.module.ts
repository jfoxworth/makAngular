
// Standard Angular Items
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';


// Angular Material Items
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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { DragDropModule } from '@angular/cdk/drag-drop';



// Fuse Specific Items
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';


// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';


// The Components
import { CreatorStudioComponent } from 'app/main/creator-studio/creator-studio.component';
import { DesignListComponent } from './tabs/design-list/design-list.component';
import { editParameterDialog } from './parameter-dialog/parameter-dialog.component';
import { SubmenuDialog } from './submenu-dialog/submenu-dialog.component';



// Fuse Specific Items
import { FuseSidebarModule } from '@fuse/components';




// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';



// color picker
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';



// Entity Service
import { makDesignEntityService } from 'app/main/services/entity/makDesign-entity.service';
import { makDesignDataService } from 'app/main/services/entity/makDesign-data.service';
import { signoffReqEntityService } from 'app/main/services/entity/signoffReq-entity.service';
import { signoffReqDataService } from 'app/main/services/entity/signoffReq-data.service';
import { makProjectEntityService } from 'app/main/services/entity/makProject-entity.service';
import { makProjectDataService } from 'app/main/services/entity/makProject-data.service';



// The resolvers
import { MakDesignsResolver } from 'app/main/resolvers/makDesigns.resolver';
import { SignoffReqsResolver } from 'app/main/resolvers/signoffReqs.resolver';
import { MakProjectsResolver } from 'app/main/resolvers/makProjects.resolver';
import { DesignDataComponent } from './tabs/design-data/design-data.component';
import { DesignParametersComponent } from './tabs/design-parameters/design-parameters.component';
import { DesignPriceComponent } from './tabs/design-price/design-price.component';
import { DesignMarketplaceComponent } from './tabs/design-marketplace/design-marketplace.component';
import { DesignSignoffsComponent } from './tabs/design-signoffs/design-signoffs.component';




const routes: Routes = [
    {
        path     : 'creatorStudio',
        component: CreatorStudioComponent,
        resolve  : {
            makDesign: MakDesignsResolver,
            signoffReq: SignoffReqsResolver,
        }
    }
];



// NgRX related metadata for NgData
const entityMetadata: EntityMetadataMap = {
    makDesign: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
    signoffReq: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
};




@NgModule({
    declarations: [
        CreatorStudioComponent,
        DesignListComponent,
        editParameterDialog,
        SubmenuDialog,
        DesignDataComponent,
        DesignParametersComponent,
        DesignPriceComponent,
        DesignMarketplaceComponent,
        DesignSignoffsComponent,
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
        makDesignEntityService,
        makDesignDataService,
        signoffReqEntityService,
        signoffReqDataService,
        MakDesignsResolver,
        SignoffReqsResolver,
    ]
})
export class CreatorStudioModule
{


    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private makDesignDataService: makDesignDataService,
        private signoffReqDataService: signoffReqDataService){
            eds.registerMetadataMap(entityMetadata);
            entityDataService.registerService('makDesign', makDesignDataService);
            entityDataService.registerService('signoffReq', signoffReqDataService);
        }

}
