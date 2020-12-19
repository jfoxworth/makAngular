// Common Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatButtonModule } from '@angular/material/button';

import { AboutComponent } from './about/about.component';
import { ClientsComponent } from './about/clients/clients.component';
import { CultureComponent } from './about/culture/culture.component';
import { TopImageComponent } from './about/top-image/top-image.component';

import { ContactComponent } from './contact/contact.component';
import { ContactTopImageComponent } from './contact/top-image/top-image.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';

import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';
import { SquareComponent } from './home/square/square.component';
import { CovidComponent } from './home/covid/covid.component';
import { HomeAboutComponent } from './home/about/about.component';

import { OurWorkComponent } from './our-work/our-work.component';
import { ProductsComponent } from './products/products.component';

import { ServicesComponent } from './services/services.component';
import { ServicesTopImageComponent } from './services/top-image/top-image.component';
import { ServicesStepGifsComponent } from './services/step-gifs/step-gifs.component';
import { ServicesContactComponent } from './services/contact/contact.component';

import { WallsComponent } from './walls/walls.component';
import { SeatingComponent } from './seating/seating.component';
import { IslandsComponent } from './islands/islands.component';
import { DesksComponent } from './desks/desks.component';

import { FooterComponent } from './shared/footer/footer.component';
import { RelatedRowComponent } from './shared/related-row/related-row.component';
import { PageBlockComponent } from './shared/page-block/page-block.component';

import { ArmComponent } from './arm/arm.component';
import { ArmTopImageComponent } from './arm/topimage/topimage.component';
import { ArmBrandComponent } from './arm/brand/brand.component';
import { ArmFollowupComponent } from './arm/followup/followup.component';


import { DaikinComponent } from './daikin/daikin.component';
import { DaikinFollowupComponent } from './daikin/followup/followup.component';
import { DaikinBrandComponent } from './daikin/brand/brand.component';
import { DaikinTopImageComponent } from './daikin/topimage/topimage.component';

import { RamadaComponent } from './ramada/ramada.component';
import { RamadaFollowupComponent } from './ramada/followup/followup.component';
import { RamadaTopImageComponent } from './ramada/topimage/topimage.component';
import { RamadaBrandComponent } from './ramada/brand/brand.component';

import { HoustonsFirstComponent } from './houstonsfirst/houstonsfirst.component';
import { HoustonsFirstFollowupComponent } from './houstonsfirst/followup/followup.component';
import { HoustonsFirstTopImageComponent } from './houstonsfirst/topimage/topimage.component';
import { HoustonsFirstBrandComponent } from './houstonsfirst/brand/brand.component';
import { JacobwhiteComponent } from './jacobwhite/jacobwhite.component';
import { TopimageComponent } from './jacobwhite/topimage/topimage.component';
import { BrandComponent } from './jacobwhite/brand/brand.component';
import { FollowupComponent } from './jacobwhite/followup/followup.component';


@NgModule({
  declarations: [
    AboutComponent,
    ClientsComponent,
    CultureComponent,
    TopImageComponent,
    ContactComponent,
    HomeComponent,
    OurWorkComponent,
    ProductsComponent,
    FooterComponent,
    RelatedRowComponent,
    ServicesTopImageComponent,
    ServicesStepGifsComponent,
    ServicesComponent,
    ServicesContactComponent,
    ContactFormComponent,
    ContactTopImageComponent,
    WallsComponent,
    SeatingComponent,
    IslandsComponent,
    DesksComponent,
    PageBlockComponent,
    SliderComponent,
    SquareComponent,
    CovidComponent,
    HomeAboutComponent,

    ArmComponent,
    ArmTopImageComponent,
    ArmBrandComponent,
    ArmFollowupComponent,

    DaikinComponent,
    DaikinFollowupComponent,
    DaikinTopImageComponent,
    DaikinBrandComponent,

    RamadaComponent,
    RamadaTopImageComponent,
    RamadaFollowupComponent,
    RamadaBrandComponent,
    
    HoustonsFirstComponent,
    HoustonsFirstFollowupComponent,
    HoustonsFirstBrandComponent,
    HoustonsFirstTopImageComponent,
    JacobwhiteComponent,
    TopimageComponent,
    BrandComponent,
    FollowupComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCarouselModule,
    MatButtonModule,

  ]
})
export class CommercialModule { }
