
// Common Angular Items
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatToolbarModule } from '@angular/material/toolbar';



// Mak Components
import { NavbarModule } from '../Shared/navbar/navbar.module';
import { TitleBannerModule } from '../Shared/title-banner/title-banner.module';
import { ChatComponent } from './chat.component';
import { ChatStartComponent } from './chat-start/chat-start.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatChatsSidenavComponent } from './sidenavs/left/chats/chats.component';
import { ChatUserSidenavComponent } from './sidenavs/left/user/user.component';
import { ChatLeftSidenavComponent } from './sidenavs/left/left.component';
import { ChatRightSidenavComponent } from './sidenavs/right/right.component';
import { ChatContactSidenavComponent } from './sidenavs/right/contact/contact.component';


@NgModule({
    declarations: [
        ChatComponent,
        ChatViewComponent,
        ChatStartComponent,
        ChatChatsSidenavComponent,
        ChatUserSidenavComponent,
        ChatContactSidenavComponent,
        ChatLeftSidenavComponent,
        ChatRightSidenavComponent,
    ],
    imports     : [

        CommonModule,
        TitleBannerModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        NavbarModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,

    ],
    providers   : [
    ],
    exports: [ MatSidenavModule ],
})
export class ChatModule
{
}
