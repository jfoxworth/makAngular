import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FuseSharedModule } from '@fuse/shared.module';

import { StoreComponent } from 'app/main/store/store.component';
import { StoreProductComponent } from './product/product.component';
import { CarouselComponent } from 'app/main/store/carousel/carousel.component';

import { MatCarouselModule } from '@ngmodule/material-carousel';

import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';



const routes = [
    {
        path     : 'store',
        component: StoreComponent,
        resolve  : {
        }
    },
    {
        path     : 'store/:itemId/:itemSlug',
        component: StoreProductComponent,
        resolve  : {
        }
    }
];

@NgModule({
    declarations: [
        StoreComponent,
        StoreProductComponent,
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

        FuseSharedModule,
        FuseSidebarModule
    ],
    exports     : [
        StoreComponent
    ],
    providers   : [

    ]
})

export class StoreModule
{
}

