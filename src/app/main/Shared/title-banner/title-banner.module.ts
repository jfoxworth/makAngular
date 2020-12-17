import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TitleBannerComponent } from './title-banner.component';

@NgModule({
  declarations: [
    TitleBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
  ],
  exports : [
    TitleBannerComponent,
  ]
})
export class TitleBannerModule { }
