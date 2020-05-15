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
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';




import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { EcommerceProductsComponent } from 'app/main/e-commerce/products/products.component';
import { EcommerceProductsService } from 'app/main/services/products.service';
import { EcommerceProductComponent } from 'app/main/e-commerce/product/product.component';
import { EcommerceProductService } from 'app/main/services/product.service';
import { EcommerceComponent } from 'app/main/e-commerce/e-commerce.component';

import { QuoteComponent } from 'app/main/e-commerce/quote/quote.component';
import { QuoteService } from 'app/main/services/quote.service';

import { FuseSidebarModule } from '@fuse/components';


const routes: Routes = [
    {
        path     : 'products',
        component: EcommerceComponent,
        resolve  : {
            data: EcommerceProductsService, QuoteService
        }
    },
    {
        path     : 'products/:id',
        component: EcommerceProductComponent,
        resolve  : {
            data: EcommerceProductService, QuoteService
        }
    },
    {
        path     : 'products/:id/:handle',
        component: EcommerceProductComponent,
        resolve  : {
            data: EcommerceProductService, QuoteService
        }
    }
];

@NgModule({
    declarations: [
        EcommerceProductsComponent,
        EcommerceProductComponent,
        EcommerceComponent,
        QuoteComponent,
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

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule
    ],
    providers   : [
        EcommerceProductsService,
        EcommerceProductService,
        QuoteService,
    ]
})
export class EcommerceModule
{
}
