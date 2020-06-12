import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { InvoiceService } from 'app/main/services/invoice.service';
import { InvoiceModernComponent } from 'app/main/invoices/modern/modern.component';
import { MatButtonModule } from '@angular/material/button';

const routes = [
    {
        path     : 'invoice/design/:designId',
        component: InvoiceModernComponent,
        resolve  : {
            search: InvoiceService
        }
    },
    {
        path     : 'invoice/:versionId',
        component: InvoiceModernComponent,
        resolve  : {
            search: InvoiceService
        }
    }
];

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
        InvoiceService
    ]
})
export class InvoiceModernModule
{
}
