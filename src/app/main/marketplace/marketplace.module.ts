import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FuseSharedModule } from '@fuse/shared.module';

import { MarketplaceComponent } from 'app/main/marketplace/marketplace.component';
import { MarketplaceProductComponent } from './product/product.component';
import { CarouselComponent } from 'app/main/marketplace/carousel/carousel.component';

import { MatCarouselModule } from '@ngmodule/material-carousel';

import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';



const routes = [
    {
        path     : 'marketplace',
        component: MarketplaceComponent,
        resolve  : {
        }
    },
    {
        path     : 'marketplace/:itemId/:itemSlug',
        component: MarketplaceProductComponent,
        resolve  : {
        }
    }
];

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

    ]
})

export class MarketplaceModule
{
}

