

// Standard Angular Items
import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



// Angular Material Items
import { MatExpansionModule } from '@angular/material/expansion';
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


// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';



// Fuse specific items
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';


// The components
import { DesignStudioComponent } from 'app/main/design-studio/design-studio.component';
import { SidebarComponent } from './sidebar/sidebar.component';


// Services
import { DesignStudioService } from 'app/main/services/design-studio.service';



// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { designImagesReducer } from 'app/main/reducers';
import { AuthEffects } from 'app/main/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


// Entity Service
import { makDesignEntityService } from 'app/main/services/entity/makDesign-entity.service';
import { makDesignDataService } from 'app/main/services/entity/makDesign-data.service';
import { signoffReqEntityService } from 'app/main/services/entity/signoffReq-entity.service';
import { signoffReqDataService } from 'app/main/services/entity/signoffReq-data.service';
import { makProjectEntityService } from 'app/main/services/entity/makProject-entity.service';
import { makProjectDataService } from 'app/main/services/entity/makProject-data.service';
import { makVersionEntityService } from 'app/main/services/entity/makVersion-entity.service';
import { makVersionDataService } from 'app/main/services/entity/makVersion-data.service';



// The resolvers
import { MakDesignsResolver } from 'app/main/resolvers/makDesigns.resolver';
import { SignoffReqsResolver } from 'app/main/resolvers/signoffReqs.resolver';
import { MakProjectsResolver } from 'app/main/resolvers/makProjects.resolver';
import { MakVersionsResolver } from 'app/main/resolvers/makVersions.resolver';





const routes = [
    {
        path     : 'designStudio/design/:designId',
        component: DesignStudioComponent,
        resolve: {
            makDesign: MakDesignsResolver,
            makProject: MakProjectsResolver
        }
    },
    {
        path     : 'designStudio/project/:projectId',
        component: DesignStudioComponent,
        resolve: {
            makDesign: MakDesignsResolver,
            makProject: MakProjectsResolver,
            makVersion: MakVersionsResolver
        }
    },
    {
        path     : 'designStudio/:designId',
        component: DesignStudioComponent,
        resolve: {
            makDesign: MakDesignsResolver,
            makProject: MakProjectsResolver
        }
    },
    {
        path     : 'designStudio',
        component: DesignStudioComponent,
        resolve: {
            makDesign: MakDesignsResolver
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
    makProject: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
};




@NgModule({
    declarations: [
        DesignStudioComponent,
        SidebarComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        StoreModule.forFeature('designs', designImagesReducer),
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
		makDesignEntityService,
		makDesignDataService,
		signoffReqEntityService,
		signoffReqDataService,
		makProjectEntityService,
		makProjectDataService,
		MakDesignsResolver,
		MakProjectsResolver,
		SignoffReqsResolver,
		makVersionEntityService,
		makVersionDataService,
		MakVersionsResolver,
    ]
})
export class DesignStudioModule
{




    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private makDesignDataService: makDesignDataService,
        private signoffReqDataService: signoffReqDataService,
        private makProjectDataService: makProjectDataService,
		private makVersionDataService: makVersionDataService ){
            eds.registerMetadataMap(entityMetadata);
            entityDataService.registerService('makDesign', makDesignDataService);
            entityDataService.registerService('signoffReq', signoffReqDataService);
            entityDataService.registerService('makProject', makProjectDataService);
            entityDataService.registerService('makVersion', signoffReqDataService);
			entityDataService.registerService('makVersion', makVersionDataService);
        }

    static forRoot(): ModuleWithProviders<DesignStudioModule> {
        return {
            ngModule: DesignStudioModule,
            providers: [
            ]
        }
    }


}
