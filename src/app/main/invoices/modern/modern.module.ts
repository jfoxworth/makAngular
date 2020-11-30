
// Standard Angular Items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


// Angular Material Items
import { MatButtonModule } from '@angular/material/button';


// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Services
import { InvoiceService } from 'app/main/services/invoice.service';


// The component
import { InvoiceModernComponent } from 'app/main/invoices/modern/modern.component';


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
import { StoreModule } from '@ngrx/store';



// The resolvers
import { MakDesignsResolver } from 'app/main/resolvers/makDesigns.resolver';
import { MakProjectsResolver } from 'app/main/resolvers/makProjects.resolver';
import { MakVersionsResolver } from 'app/main/resolvers/makVersions.resolver';
//import { oneVersionResolver } from 'app/main/resolvers/oneVersion.resolver';
//import { oneProjectResolver } from 'app/main/resolvers/oneProject.resolver';
//import { oneDesignResolver } from 'app/main/resolvers/oneDesign.resolver';




const routes = [
    {
        path     : 'invoice/design/:designId',
        component: InvoiceModernComponent,
        resolve: {
            makDesign: MakDesignsResolver,
            makVersion: MakVersionsResolver
        }
    },
    {
        path     : 'invoice/:versionId',
        component: InvoiceModernComponent,
        resolve: {
            makDesign: MakDesignsResolver,
//            invoiceVersion: oneVersionResolver,
//            invoiceProject: oneProjectResolver,
//            invoiceDesign: oneDesignResolver
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
        InvoiceModernComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        FuseSharedModule,
        MatButtonModule
    ],
    providers   : [
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
//        oneVersionResolver,
//        oneProjectResolver,
//        oneDesignResolver
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

