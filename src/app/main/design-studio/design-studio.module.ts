

// Standard Angular Items
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// Angular Material Items
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule} from '@angular/material/icon';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSliderModule} from '@angular/material/slider';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDividerModule} from '@angular/material/divider';


// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';

// The components
import { NavbarModule } from '../Shared/navbar/navbar.module';
import { TitleBannerModule } from '../Shared/title-banner/title-banner.module';
import { DesignStudioComponent } from './design-studio.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HexagonsComponent } from './sidebar/hexagons/hexagons.component';
import { MakButtonsComponent } from './sidebar/mak-buttons/mak-buttons.component';
import { VersionListComponent } from './sidebar/version-list/version-list.component';
import { SignoffsComponent } from './sidebar/signoffs/signoffs.component';
import { DesignCostComponent } from './sidebar/design-cost/design-cost.component';
import { ProjectCostComponent } from './sidebar/project-cost/project-cost.component';
import { DropdownComponent } from './sidebar/dropdown/dropdown.component';
import { SliderComponent } from './sidebar/slider/slider.component';
import { TextComponent } from './sidebar/text/text.component';
import { ToggleComponent } from './sidebar/toggle/toggle.component';
import { FileuploadComponent } from './sidebar/fileupload/fileupload.component';
import { ColorselectComponent } from './sidebar/colorselect/colorselect.component';
import { ImageselectComponent } from './sidebar/imageselect/imageselect.component';
import { BlobitemsComponent } from './sidebar/blobitems/blobitems.component';

// Services
import { DesignStudioService } from '../services/design-studio.service';

// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { designImagesReducer } from '../store/reducers';
import { StoreModule } from '@ngrx/store';

// Entity Service
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { makDesignDataService } from '../services/entity/makDesign-data.service';
import { signoffReqEntityService } from '../services/entity/signoffReq-entity.service';
import { signoffReqDataService } from '../services/entity/signoffReq-data.service';
import { makProjectEntityService } from '../services/entity/makProject-entity.service';
import { makProjectDataService } from '../services/entity/makProject-data.service';
import { makVersionEntityService } from '../services/entity/makVersion-entity.service';
import { makVersionDataService } from '../services/entity/makVersion-data.service';

// The resolvers
import { MakDesignsResolver } from '../resolvers/makDesigns.resolver';
import { SignoffReqsResolver } from '../resolvers/signoffReqs.resolver';
import { MakProjectsResolver } from '../resolvers/makProjects.resolver';
import { MakVersionsResolver } from '../resolvers/makVersions.resolver';




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

};




@NgModule({
    declarations: [
        DesignStudioComponent,
        SidebarComponent,
        HexagonsComponent,
        MakButtonsComponent,
        VersionListComponent,
        SignoffsComponent,
        DesignCostComponent,
        ProjectCostComponent,
        DropdownComponent,
        SliderComponent,
        TextComponent,
        ToggleComponent,
        FileuploadComponent,
        ColorselectComponent,
        ImageselectComponent,
        BlobitemsComponent

      ],
    imports     : [
        StoreModule.forFeature('designs', designImagesReducer),
        MatExpansionModule,
        CommonModule,
        NavbarModule,
        TitleBannerModule,
        FlexLayoutModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatSliderModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatDividerModule,
        MatSelectModule,
        MatGridListModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,

        Ng5SliderModule,


    ],
    providers   : [
		makDesignEntityService,
		makDesignDataService,
		signoffReqEntityService,
		signoffReqDataService,
		makProjectEntityService,
		makProjectDataService,
		MakDesignsResolver,
		MakProjectsResolver,
		SignoffReqsResolver,
		makVersionEntityService,
		makVersionDataService,
		MakVersionsResolver,
    ]
})
export class DesignStudioModule
{




    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private makDesignDataService: makDesignDataService,
        private signoffReqDataService: signoffReqDataService,
        private makProjectDataService: makProjectDataService,
		private makVersionDataService: makVersionDataService ){
            eds.registerMetadataMap(entityMetadata);
            entityDataService.registerService('makDesign', makDesignDataService);
            entityDataService.registerService('signoffReq', signoffReqDataService);
            entityDataService.registerService('makProject', makProjectDataService);
            entityDataService.registerService('makVersion', signoffReqDataService);
      			entityDataService.registerService('makVersion', makVersionDataService);
        }

    static forRoot(): ModuleWithProviders<DesignStudioModule> {
        return {
            ngModule: DesignStudioModule,
            providers: [
            ]
        }
    }


}
