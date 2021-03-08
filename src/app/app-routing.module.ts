
// Common Angular Items
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Mak Components
import { HomeComponent } from './main/commercial/home/home.component';
import { AboutComponent } from './main/commercial/about/about.component';
import { ContactComponent } from './main/commercial/contact/contact.component';
import { OurWorkComponent } from './main/commercial/our-work/our-work.component';
import { ProductsComponent } from './main/commercial/products/products.component';
import { ServicesComponent } from './main/commercial/services/services.component';
import { WallsComponent } from './main/commercial/walls/walls.component';
import { DesksComponent } from './main/commercial/desks/desks.component';
import { SeatingComponent } from './main/commercial/seating/seating.component';
import { IslandsComponent } from './main/commercial/islands/islands.component';
import { ArmComponent } from './main/commercial/arm/arm.component';
import { DaikinComponent } from './main/commercial/daikin/daikin.component';
import { HoustonsFirstComponent } from './main/commercial/houstonsfirst/houstonsfirst.component';
import { RamadaComponent } from './main/commercial/ramada/ramada.component';
import { JacobwhiteComponent } from './main/commercial/jacobwhite/jacobwhite.component';

import { LoginComponent } from './main/Common/login/login.component';
import { ProfileComponent } from './main/profile/profile.component';
import { MarketplaceComponent } from './main/marketplace/marketplace.component';
import { ProductComponent } from './main/marketplace/product/product.component';
import { KnowledgeBaseComponent } from './main/knowledge-base/knowledge-base.component';
import { ProjectsComponent } from './main/projects/projects.component';
import { DesignStudioComponent } from './main/design-studio/design-studio.component';
import { ChatComponent } from './main/chat/chat.component';
import { InvoiceModernComponent } from './main/invoices/modern/modern.component';
import { CreatorStudioComponent } from './main/creator-studio/creator-studio.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';

// The resolvers
import { MakDesignsResolver } from './main/resolvers/makDesigns.resolver';
import { SignoffReqsResolver } from './main/resolvers/signoffReqs.resolver';
import { MakProjectsResolver } from './main/resolvers/makProjects.resolver';
import { MakVersionsResolver } from './main/resolvers/makVersions.resolver';
import { MakAnnouncementsResolver } from './main/resolvers/makAnnouncements.resolver';

// Guards
import { AuthGuard } from './main/guards/auth.guard';
import { DesignerGuard } from './main/guards/designer.guard';


const routes: Routes = [

  { path : '', component:HomeComponent },
  { path : 'aboutUs', component:AboutComponent },
  { path : 'contact', component:ContactComponent },
  { path : 'ourWork', component:OurWorkComponent },
  { path : 'products', component:ProductsComponent },
  { path : 'services', component:ServicesComponent },
  { path : 'walls', component:WallsComponent },
  { path : 'seating', component:SeatingComponent },
  { path : 'desks', component:DesksComponent },
  { path : 'islands', component:IslandsComponent },
  { path : 'arm', component:ArmComponent },
  { path : 'daikin', component:DaikinComponent },
  { path : 'ramada', component:RamadaComponent },
  { path : 'houstonsfirst', component:HoustonsFirstComponent },
  { path : 'jacobwhite', component:JacobwhiteComponent },



  { path : 'login', component:LoginComponent },


  { path : 'profile', loadChildren:'./main/profile/profile.module#ProfileModule' },

  { path : 'knowledgebase', component:KnowledgeBaseComponent, loadChildren:'./main/knowledge-base/knowledge-base.module#KnowledgeBaseModule' },
  { path : 'knowledge-base', component:KnowledgeBaseComponent, loadChildren:'./main/knowledge-base/knowledge-base.module#KnowledgeBaseModule' },
  { path : 'messages', component: ChatComponent },

  { path : 'creatorStudio', component:CreatorStudioComponent,
    resolve: {
      makDesign: MakDesignsResolver,
      makVersion: MakVersionsResolver
    },
    canActivate:[AuthGuard, DesignerGuard],
    loadChildren:'./main/creator-studio/creator-studio.module#CreatorStudioModule'
  },
  { path : 'creator-studio', component:CreatorStudioComponent,
    resolve: {
      makDesign: MakDesignsResolver,
    },
    canActivate:[AuthGuard, DesignerGuard],
    loadChildren:'./main/creator-studio/creator-studio.module#CreatorStudioModule'
  },

  { path : 'invoice/design/:designId',
    component: InvoiceModernComponent,
    resolve: {
      makDesign: MakDesignsResolver,
      makVersion: MakVersionsResolver
    },
    loadChildren:'./main/invoices/modern/modern.module#InvoiceModernModule'
  },
  {
    path     : 'invoice/:versionId',
    component: InvoiceModernComponent,
    resolve: {
      makDesign: MakDesignsResolver,
    }
  },
  { path : 'marketplace',
    component:MarketplaceComponent,
    resolve: {
      makDesign: MakDesignsResolver,
      signoffReq: SignoffReqsResolver,
      makProject: MakProjectsResolver
    },
    loadChildren:'./main/marketplace/marketplace.module#MarketplaceModule' 
  },
  {
    path	 : 'marketplace/:itemId/:itemSlug',
    component: ProductComponent,
    resolve: {
      makDesign: MakDesignsResolver,
      signoffReq: SignoffReqsResolver,
      makProject: MakProjectsResolver
    }
  },

  { path : 'projects',
    component:ProjectsComponent,
    resolve: {
			makVersion: MakVersionsResolver,
			makDesign: MakDesignsResolver,
			signoffReq: SignoffReqsResolver,
			makProject: MakProjectsResolver,
    },
    canActivate:[AuthGuard],
    loadChildren:'./main/projects/projects.module#ProjectsModule' 
  },
  {
    path     : 'designStudio/design/:designId',
    component: DesignStudioComponent,
    resolve: {
        makDesign: MakDesignsResolver,
        makProject: MakProjectsResolver
    },
    loadChildren:'./main/design-studio/design-studio.module#DesignStudioModule'
  },
  {
    path     : 'designStudio/project/:projectId',
    component: DesignStudioComponent,
    resolve: {
        makDesign: MakDesignsResolver,
        makProject: MakProjectsResolver,
        makVersion: MakVersionsResolver
    },
    loadChildren:'./main/design-studio/design-studio.module#DesignStudioModule'
  },
  {
    path     : 'designStudio/:designId',
    component: DesignStudioComponent,
    resolve: {
        makDesign: MakDesignsResolver,
        makProject: MakProjectsResolver
    },
    loadChildren:'./main/design-studio/design-studio.module#DesignStudioModule'
  },
  {
    path     : 'designStudio',
    component: DesignStudioComponent,
    resolve: {
        makDesign: MakDesignsResolver
    },
    loadChildren:'./main/design-studio/design-studio.module#DesignStudioModule'
  },
  {
    path     : 'dashboard',
    component: DashboardComponent,
    resolve: {
      makAnnouncement: MakAnnouncementsResolver,
      makDesign: MakDesignsResolver,
      makProject: MakProjectsResolver
},
  loadChildren:'./main/dashboard/dashboard.module#DashboardModule'
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



