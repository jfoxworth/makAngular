

// Standard Angular Items
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// Angular Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

// Mak components
import { NavbarModule } from '../Shared/navbar/navbar.module';
import { TitleBannerModule } from '../Shared/title-banner/title-banner.module';
import { ProjectsComponent } from './projects.component';
import { ProjectDataComponent } from './tabs/project-data/project-data.component';
import { ProjectListComponent } from './tabs/project-list/project-list.component';
import { ProjectListListComponent } from './tabs/project-list-list/project-list-list.component';
import { ProjectListCardComponent } from './tabs/project-list-card/project-list-card.component';
import { StatusDataComponent } from './tabs/status-data/status-data.component';
import { VersionDataComponent } from './tabs/version-data/version-data.component';
import { VersionListComponent } from './tabs/version-list/version-list.component';
import { VersionMeasurementsComponent } from './tabs/version-measurements/version-measurements.component';
import { VersionSpecsComponent } from './tabs/version-specs/version-specs.component';
import { SignoffsComponent } from './tabs/signoffs/signoffs.component';

// Services
import { ProjectsService } from '../services/projects.service';

// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';

// Entity Service
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { makDesignDataService } from '../services/entity/makDesign-data.service';
import { signoffReqEntityService } from '../services/entity/signoffReq-entity.service';
import { signoffReqDataService } from '../services/entity/signoffReq-data.service';
import { makProjectEntityService } from '../services/entity/makProject-entity.service';
import { makProjectDataService } from '../services/entity/makProject-data.service';
import { makVersionEntityService } from '../services/entity/makVersion-entity.service';
import { makVersionDataService } from '../services/entity/makVersion-data.service';
import { designSignoffEntityService } from '../services/entity/designSignoff-entity.service';
import { designSignoffDataService } from '../services/entity/designSignoff-data.service';
import { designImagesReducer } from '../store/reducers';
import { StoreModule } from '@ngrx/store';

// The resolvers
import { MakDesignsResolver } from '../resolvers/makDesigns.resolver';
import { SignoffReqsResolver } from '../resolvers/signoffReqs.resolver';
import { MakDesignSignoffsResolver } from '../resolvers/designSignoffs.resolver';
import { MakProjectsResolver } from '../resolvers/makProjects.resolver';
import { MakVersionsResolver } from '../resolvers/makVersions.resolver';

// Guards
import { AuthGuard } from '../guards/auth.guard';






// NgRX related metadata for NgData
const entityMetadata: EntityMetadataMap = {
    makDesign: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
    signoffReq: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
    makProject: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
    makVersion: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
		designSignoff: {
				entityDispatcherOptions: {
						optimisticUpdate:true
				}
		}
};




const routes : Routes = [
  {
    path:'',
    component:ProjectsComponent
  }
];




@NgModule({
	declarations: [
		ProjectsComponent,
		ProjectDataComponent,
		ProjectListComponent,
		ProjectListListComponent,
		ProjectListCardComponent,
		StatusDataComponent,
		VersionDataComponent,
		VersionListComponent,
		VersionMeasurementsComponent,
		VersionSpecsComponent,
		SignoffsComponent,
	],
	imports	 : [
		StoreModule.forFeature('designs', designImagesReducer),
    RouterModule.forChild(routes),

    CommonModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    TitleBannerModule,
    MatButtonModule,
		MatChipsModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatRippleModule,
		MatSelectModule,
		MatSortModule,
		MatSnackBarModule,
		MatTableModule,
		MatTabsModule,
		MatDividerModule,
		MatStepperModule,
		MatListModule,
		MatTooltipModule,
    MatCarouselModule,
    MatCardModule,
    MatGridListModule

	],
	providers   : [
		ProjectsService,
		makDesignEntityService,
		makDesignDataService,
		signoffReqEntityService,
		signoffReqDataService,
		makProjectEntityService,
		makProjectDataService,
		makVersionEntityService,
		makVersionDataService,
		designSignoffEntityService,
		designSignoffDataService,
		MakDesignsResolver,
		MakProjectsResolver,
		MakVersionsResolver,
		SignoffReqsResolver,
		MakDesignSignoffsResolver,
		AuthGuard,
	]
})
export class ProjectsModule
{

	constructor(
		private eds: EntityDefinitionService,
		private entityDataService: EntityDataService,
		private makDesignDataService: makDesignDataService,
		private signoffReqDataService: signoffReqDataService,
		private makProjectDataService: makProjectDataService,
    private makVersionDataService: makVersionDataService,
		private designSignoffDataService:designSignoffDataService
    ){
			eds.registerMetadataMap(entityMetadata);
			entityDataService.registerService('makDesign', makDesignDataService);
			entityDataService.registerService('signoffReq', signoffReqDataService);
			entityDataService.registerService('designSignoff', designSignoffDataService);
      entityDataService.registerService('makProject', makProjectDataService);
			entityDataService.registerService('makVersion', makVersionDataService);
		}



}
