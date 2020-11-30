

// Standard Angular Items
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
import { MatCarouselModule } from '@ngmodule/material-carousel';



// Fuse Specific Items
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule } from '@fuse/components';



// Mak components
import { EcommerceComponent } from 'app/main/e-commerce/e-commerce.component';


// Services 
import { EcommerceService } from 'app/main/services/e-commerce.service';


// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';



// Entity Service
import { makDesignEntityService } from 'app/main/services/entity/makDesign-entity.service';
import { makDesignDataService } from 'app/main/services/entity/makDesign-data.service';
import { signoffReqEntityService } from 'app/main/services/entity/signoffReq-entity.service';
import { signoffReqDataService } from 'app/main/services/entity/signoffReq-data.service';
import { makProjectEntityService } from 'app/main/services/entity/makProject-entity.service';
import { makProjectDataService } from 'app/main/services/entity/makProject-data.service';
import { makVersionEntityService } from 'app/main/services/entity/makVersion-entity.service';
import { makVersionDataService } from 'app/main/services/entity/makVersion-data.service';
import { designImagesReducer } from 'app/main/reducers';
import { StoreModule } from '@ngrx/store';



// The resolvers
import { MakDesignsResolver } from 'app/main/resolvers/makDesigns.resolver';
import { SignoffReqsResolver } from 'app/main/resolvers/signoffReqs.resolver';
import { MakProjectsResolver } from 'app/main/resolvers/makProjects.resolver';
import { MakVersionsResolver } from 'app/main/resolvers/makVersions.resolver';







const routes: Routes = [
	{
		path	 : 'products',
		component: EcommerceComponent,
		resolve: {
			makDesign: MakDesignsResolver,
			signoffReq: SignoffReqsResolver,
			makProject: MakProjectsResolver,
			makVersion: MakVersionsResolver
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
    makVersion: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
};



@NgModule({
	declarations: [
		EcommerceComponent,
	],
	imports	 : [
		RouterModule.forChild(routes),
		StoreModule.forFeature('designs', designImagesReducer),

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
		MatTooltipModule,
		MatCarouselModule,

		NgxChartsModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
		}),

		FuseSharedModule,
		FuseSidebarModule,
		FuseWidgetModule
	],
	providers   : [
		EcommerceService,
		makDesignEntityService,
		makDesignDataService,
		signoffReqEntityService,
		signoffReqDataService,
		makProjectEntityService,
		makProjectDataService,
		makVersionEntityService,
		makVersionDataService,
		MakDesignsResolver,
		MakProjectsResolver,
		MakVersionsResolver,
		SignoffReqsResolver,
	]
})
export class EcommerceModule
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
			entityDataService.registerService('makVersion', makVersionDataService);
		}

}
