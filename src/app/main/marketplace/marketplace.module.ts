

// Core Angular Items
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



// Angular Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCarouselModule } from '@ngmodule/material-carousel';



// Mak Components
import { MarketplaceComponent } from 'app/main/marketplace/marketplace.component';
import { MarketplaceProductComponent } from './product/product.component';



// Fuse specific items
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSharedModule } from '@fuse/shared.module';


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
import { designSignoffDataService } from 'app/main/services/entity/designSignoff-data.service';
import { designSignoffEntityService } from 'app/main/services/entity/designSignoff-entity.service';



// The resolvers
import { MakDesignsResolver } from 'app/main/resolvers/makDesigns.resolver';
import { SignoffReqsResolver } from 'app/main/resolvers/signoffReqs.resolver';
import { MakProjectsResolver } from 'app/main/resolvers/makProjects.resolver';



// Servers
import { AuthService } from 'app/main/services/auth.service';


const routes = [
	{
		path	 : 'marketplace',
		component: MarketplaceComponent,
		resolve: {
			makDesign: MakDesignsResolver,
			signoffReq: SignoffReqsResolver,
			makProject: MakProjectsResolver
		}
	},
	{
		path	 : 'marketplace/:itemId/:itemSlug',
		component: MarketplaceProductComponent,
		resolve: {
			makDesign: MakDesignsResolver,
			signoffReq: SignoffReqsResolver,
			makProject: MakProjectsResolver
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
		MarketplaceComponent,
		MarketplaceProductComponent,
	],
	imports	 : [
		RouterModule.forChild(routes),
		StoreModule.forFeature('designs', designImagesReducer),
		//EffectsModule.forFeature([AuthEffects]),

		TranslateModule,

		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatTabsModule,
		MatCarouselModule,
		MatListModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTooltipModule,

		FuseSharedModule,
		FuseSidebarModule
	],
	exports	 : [
		MarketplaceComponent
	],
	providers   : [
		makDesignEntityService,
		makDesignDataService,
		designSignoffEntityService,
		designSignoffDataService,
		signoffReqEntityService,
		signoffReqDataService,
		makProjectEntityService,
		makProjectDataService,
		MakDesignsResolver,
		MakProjectsResolver,
		SignoffReqsResolver,
	]
})

export class MarketplaceModule
{


	constructor(
		private eds: EntityDefinitionService,
		private entityDataService: EntityDataService,
		private makDesignDataService: makDesignDataService,
		private designSignoffDataService: designSignoffDataService,
		private signoffReqDataService: signoffReqDataService,
		private makProjectDataService: makProjectDataService ){
			eds.registerMetadataMap(entityMetadata);
			entityDataService.registerService('makDesign', makDesignDataService);
			entityDataService.registerService('signoffReq', signoffReqDataService);
			entityDataService.registerService('designSignoff', designSignoffDataService);
			entityDataService.registerService('makProject', makProjectDataService);
		}

	static forRoot(): ModuleWithProviders<MarketplaceModule> {
		return {
			ngModule: MarketplaceModule,
			providers: [
			  AuthService,
			]
		}
	}


}

