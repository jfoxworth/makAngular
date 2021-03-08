import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Material Items
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


// Mak Components
import { DashboardComponent } from './dashboard.component';
import { DashboardMenuComponent } from './menu/menu.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { NavbarModule } from '../Shared/navbar/navbar.module';
import { ProjectsComponent } from './projects/projects.component';
import { ProductsComponent } from './products/products.component';
import { LunchandlearnsComponent } from './lunchandlearns/lunchandlearns.component';
import { WorkshopsComponent } from './workshops/workshops.component';

// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { designImagesReducer } from '../store/reducers';
import { StoreModule } from '@ngrx/store';

// Entity Service
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { makDesignDataService } from '../services/entity/makDesign-data.service';
import { makAnnouncementEntityService } from '../services/entity/makAnnouncement-entity.service';
import { makAnnouncementDataService } from '../services/entity/makAnnouncement-data.service';
import { makProjectEntityService } from '../services/entity/makProject-entity.service';
import { makProjectDataService } from '../services/entity/makProject-data.service';

// Resolvers
import { MakAnnouncementsResolver } from '../resolvers/makAnnouncements.resolver';
import { MakProjectsResolver } from '../resolvers/makProjects.resolver';

// Services
import { AuthService } from '../services/auth.service';



// NgRX related metadata for NgData
const entityMetadata: EntityMetadataMap = {
  makAnnouncement: {
      entityDispatcherOptions: {
          optimisticUpdate: true
      }
  },
	makProject: {
		entityDispatcherOptions: {
			optimisticUpdate: true
		}
	},
};


const routes : Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  }
];



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMenuComponent,
    AnnouncementsComponent,
    ProjectsComponent,
    ProductsComponent,
    LunchandlearnsComponent,
    WorkshopsComponent
  ],
  imports: [
		StoreModule.forFeature('designs', designImagesReducer),
    RouterModule.forChild(routes),
    CommonModule,
    NavbarModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers:[
    makDesignEntityService,
		makDesignDataService,
		makAnnouncementEntityService,
    makAnnouncementDataService,
    MakAnnouncementsResolver,
		makProjectEntityService,
    makProjectDataService,
    MakProjectsResolver,

  ],
  exports : [
    DashboardComponent
  ]
})
export class DashboardModule { 



  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private makDesignDataService: makDesignDataService,
    private makProjectDataService : makProjectDataService,
    private makAnnouncementDataService: makAnnouncementDataService) {
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('makDesign', makDesignDataService);
        entityDataService.registerService('makAnnouncement', makAnnouncementDataService);
        entityDataService.registerService('makProject', makProjectDataService);
    }

    static forRoot(): ModuleWithProviders<DashboardModule> {
      return {
        ngModule: DashboardModule,
        providers: [
          AuthService,
        ]
      }
    }


}
