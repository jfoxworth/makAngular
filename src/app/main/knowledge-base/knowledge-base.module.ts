
// Common Angular items
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';

// Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';


import { KnowledgeBaseService } from '../services/knowledge-base.service';
import { KnowledgeBaseComponent } from './knowledge-base.component';


import { NavbarModule } from '../Shared/navbar/navbar.module';
import { TitleBannerModule } from '../Shared/title-banner/title-banner.module';




// Needed for lazy load
const routes : Routes = [
  {
    path:'',
    component:KnowledgeBaseComponent
  }
];



@NgModule({
  declarations: [
    KnowledgeBaseComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FlexLayoutModule,
    RouterModule,

    NavbarModule,
    TitleBannerModule,

    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
  ],
  providers      : [
    KnowledgeBaseService
  ],
})
export class KnowledgeBaseModule { }
