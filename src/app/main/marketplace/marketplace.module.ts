
// Core Angular Items
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Material Items
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';


 //import { MatSnackBarModule } from '@angular/material';

/* Mak Components */
import { NavbarModule } from '../Shared/navbar/navbar.module';
import { TitleBannerModule } from '../Shared/title-banner/title-banner.module';
import { MarketplaceComponent } from './marketplace.component';
import { MarketItemComponent } from './market-item/market-item.component';
import { ProductComponent } from '../marketplace/product/product.component';
import { DescriptionComponent } from './product/description/description.component';

// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { designImagesReducer } from '../store/reducers';
import { StoreModule } from '@ngrx/store';

// Entity Service
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { makDesignDataService } from '../services/entity/makDesign-data.service';
import { signoffReqEntityService } from '../services/entity/signoffReq-entity.service';
import { signoffReqDataService } from '../services/entity/signoffReq-data.service';
import { makProjectEntityService } from '../services/entity/makProject-entity.service';
import { makProjectDataService } from '../services/entity/makProject-data.service';
import { designSignoffDataService } from '../services/entity/designSignoff-data.service';
import { designSignoffEntityService } from '../services/entity/designSignoff-entity.service';
import { makVersionDataService } from '../services/entity/makVersion-data.service';
import { makVersionEntityService } from '../services/entity/makVersion-entity.service';


// The resolvers
import { MakDesignsResolver } from '../resolvers/makDesigns.resolver';
import { SignoffReqsResolver } from '../resolvers/signoffReqs.resolver';
import { MakProjectsResolver } from '../resolvers/makProjects.resolver';

// Services
import { AuthService } from '../services/auth.service';
import { ProjectsComponent } from './product/projects/projects.component';
import { ButtonsComponent } from './product/buttons/buttons.component';
import { CarouselComponent } from './product/carousel/carousel.component';
import { MakVersionsResolver } from '../resolvers/makVersions.resolver';
import { MainProductComponent } from './product/main/main.component';


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
    MarketItemComponent,
    ProductComponent,
    DescriptionComponent,
    ProjectsComponent,
    ButtonsComponent,
    CarouselComponent,
    MainProductComponent,
  ],
  imports: [
		StoreModule.forFeature('designs', designImagesReducer),

    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    NavbarModule,
    TitleBannerModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatCarouselModule,
    MatTooltipModule
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
    makVersionDataService,
		MakDesignsResolver,
		MakProjectsResolver,
    SignoffReqsResolver,
    MakVersionsResolver,
    makVersionEntityService
  ],
  exports : [
    MainProductComponent
  ]
})
export class MarketplaceModule {

	constructor(
		private eds: EntityDefinitionService,
		private entityDataService: EntityDataService,
		private makDesignDataService: makDesignDataService,
		private designSignoffDataService: designSignoffDataService,
		private signoffReqDataService: signoffReqDataService,
    private makProjectDataService: makProjectDataService,
    private makVersionDataService : makVersionDataService ){
			eds.registerMetadataMap(entityMetadata);
			entityDataService.registerService('makDesign', makDesignDataService);
			entityDataService.registerService('signoffReq', signoffReqDataService);
			entityDataService.registerService('designSignoff', designSignoffDataService);
			entityDataService.registerService('makProject', makProjectDataService);
			entityDataService.registerService('makVersion', makVersionDataService);
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
