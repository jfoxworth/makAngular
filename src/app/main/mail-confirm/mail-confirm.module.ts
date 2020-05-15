import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';

import { MailConfirmComponent } from 'app/main/mail-confirm/mail-confirm.component';

const routes = [
    {
        path     : 'confirmEmail',
        component: MailConfirmComponent,
    }
];

@NgModule({
    declarations: [
        MailConfirmComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatIconModule,

        FuseSharedModule
    ],
    providers   : [

    ]
})
export class MailConfirmModule
{
}
