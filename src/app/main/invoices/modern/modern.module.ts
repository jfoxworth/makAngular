
// Standard Angular Items
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material Items
import { MatButtonModule } from '@angular/material/button';


// Services
import { InvoiceService } from '../../services/invoice.service';


// The component
import { InvoiceModernComponent } from './modern.component';
import { NavbarModule } from '../../Shared/navbar/navbar.module';
import { TitleBannerModule } from '../../Shared/title-banner/title-banner.module';


// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { designImagesReducer } from '../../store/reducers';
import { StoreModule } from '@ngrx/store';


// Entity Service
import { makDesignEntityService } from '../../services/entity/makDesign-entity.service';
import { makDesignDataService } from '../../services/entity/makDesign-data.service';
import { makProjectEntityService } from '../../services/entity/makProject-entity.service';
import { makProjectDataService } from '../../services/entity/makProject-data.service';
import { makVersionEntityService } from '../../services/entity/makVersion-entity.service';
import { makVersionDataService } from '../../services/entity/makVersion-data.service';



// The resolvers
import { MakDesignsResolver } from '../../resolvers/makDesigns.resolver';
import { MakProjectsResolver } from '../../resolvers/makProjects.resolver';
import { MakVersionsResolver } from '../../resolvers/makVersions.resolver';
import { AddressComponent } from './address/address.component';
import { DesignSummaryComponent } from './design-summary/design-summary.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';
import { CostListComponent } from './cost-list/cost-list.component';
import { FooterComponent } from './footer/footer.component';




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



const routes : Routes = [
    {
      path:'',
      component:InvoiceModernComponent
    }
  ];
  



@NgModule({
    declarations: [
        InvoiceModernComponent,
        AddressComponent,
        DesignSummaryComponent,
        DescriptionsComponent,
        CostListComponent,
        FooterComponent
    ],
    imports : [
      StoreModule.forFeature('designs', designImagesReducer),
      RouterModule.forChild(routes),
      CommonModule,
      FlexLayoutModule,
      NavbarModule,
      TitleBannerModule,
      RouterModule,

      MatButtonModule
    ],
    providers : [
        InvoiceService,
        makDesignEntityService,
        makDesignDataService,
        makProjectEntityService,
        makProjectDataService,
        makVersionEntityService,
        makVersionDataService,
        MakDesignsResolver,
        MakProjectsResolver,
        MakVersionsResolver,
    ]
})
export class InvoiceModernModule
{

    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private makDesignDataService: makDesignDataService,
        private makProjectDataService: makProjectDataService,
        private makVersionDataService: makVersionDataService ){
            eds.registerMetadataMap(entityMetadata);
            entityDataService.registerService('makDesign', makDesignDataService);
            entityDataService.registerService('makProject', makProjectDataService);
            entityDataService.registerService('makVersion', makVersionDataService);
        }

}

