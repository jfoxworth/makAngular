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
