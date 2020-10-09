

// Core Angular Items
import { NgModule } from '@angular/core';
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
import { CarouselComponent } from 'app/main/marketplace/carousel/carousel.component';



// Fuse specific items
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSharedModule } from '@fuse/shared.module';


// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';



// Entity Service
import { makDesignEntityService } from 'app/main/services/entity/makDesign-entity.service';
import { makDesignDataService } from 'app/main/services/entity/makDesign-data.service';


const routes = [
    {
        path     : 'marketplace',
        component: MarketplaceComponent,
    },
    {
        path     : 'marketplace/:itemId/:itemSlug',
        component: MarketplaceProductComponent,
        resolve  : {
        }
    }
];


// NgRX related metadata for NgData
const entityMetadata: EntityMetadataMap = {
    makDesign: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    }
};



@NgModule({
    declarations: [
        MarketplaceComponent,
        MarketplaceProductComponent,
        CarouselComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),

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
    exports     : [
        MarketplaceComponent
    ],
    providers   : [
        makDesignEntityService,
        makDesignDataService
    ]
})

export class MarketplaceModule
{


    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private makDesignDataService: makDesignDataService) {

        eds.registerMetadataMap(entityMetadata);

        entityDataService.registerService('makDesign', makDesignDataService);

    }


}

