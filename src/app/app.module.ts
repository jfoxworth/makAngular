import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { ProfileModule } from 'app/main/profile/profile.module';
import { InvoiceCompactModule } from 'app/main/invoices/compact/compact.module';
import { InvoiceModernModule } from 'app/main/invoices/modern/modern.module';
import { LoginModule } from 'app/main/login/login.module';
import { RegisterModule } from 'app/main/register/register.module';
import { FaqModule } from 'app/main/faq/faq.module';
import { DesignStudioModule } from 'app/main/design-studio/design-studio.module';


import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { DesignStudioService } from 'app/main/design-studio/design-studio.service';
import { KnowledgeBaseService } from 'app/main/knowledge-base/knowledge-base.service';
import { DesignService } from 'app/main/design-service.service';


import { EcommerceModule } from 'app/main/e-commerce/e-commerce.module';
import { ChatComponent } from './main/chat/chat.component';
import { ChatViewComponent } from './main/chat/chat-view/chat-view.component';
import { ChatStartComponent } from './main/chat/chat-start/chat-start.component';
import { ChatModule } from 'app/main/chat/chat.module';
import { KnowledgeBaseModule } from 'app/main/knowledge-base/knowledge-base.module';
import { StoreModule } from 'app/main/store/store.module';
import { CreatorStudioModule } from 'app/main/creator-studio/creator-studio.module';

import { MatDialogModule } from '@angular/material/dialog';



const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'profile'
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatSliderModule,
        MatDatepickerModule,
        MatDialogModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        ProfileModule,
        InvoiceModernModule,
        InvoiceCompactModule,
        LoginModule,
        RegisterModule,
        FaqModule,
        DesignStudioModule,
        EcommerceModule,
        ChatModule,
        KnowledgeBaseModule,
        StoreModule,
        CreatorStudioModule,
        DragDropModule,


    ],
    providers :[
        DesignStudioService,
        KnowledgeBaseService,
        DesignService,
    ],
    exports : [
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
