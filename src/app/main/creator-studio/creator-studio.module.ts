
// Standard Angular Items
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


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
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { DragDropModule } from '@angular/cdk/drag-drop';

// NgRx Items
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { designImagesReducer } from '../store/reducers';
import { StoreModule } from '@ngrx/store';

// The Modules used
import { NavbarModule } from '../Shared/navbar/navbar.module';
import { TitleBannerModule } from '../Shared/title-banner/title-banner.module';
import { MarketplaceModule } from '../marketplace/marketplace.module';

// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';

// color picker
//import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

// Entity Service
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { makDesignDataService } from '../services/entity/makDesign-data.service';
import { signoffReqEntityService } from '../services/entity/signoffReq-entity.service';
import { signoffReqDataService } from '../services/entity/signoffReq-data.service';
import { makProjectEntityService } from '../services/entity/makProject-entity.service';
import { makProjectDataService } from '../services/entity/makProject-data.service';

// Services
import { AuthService } from '../services/auth.service';

// The resolvers
import { MakDesignsResolver } from '../resolvers/makDesigns.resolver';
import { SignoffReqsResolver } from '../resolvers/signoffReqs.resolver';
import { MakProjectsResolver } from '../resolvers/makProjects.resolver';

// Mak Components
import { CreatorStudioComponent } from '../../main/creator-studio/creator-studio.component';
import { DesignListComponent } from './tabs/design-list/design-list.component';
import { editParameterDialog } from './parameter-dialog/parameter-dialog.component';
import { SubmenuDialog } from './submenu-dialog/submenu-dialog.component';
import { DesignDataComponent } from './tabs/design-data/design-data.component';
import { DesignParametersComponent } from './tabs/design-parameters/design-parameters.component';
import { DesignPriceComponent } from './tabs/design-price/design-price.component';
import { DesignSignoffsComponent } from './tabs/design-signoffs/design-signoffs.component';
import { NameDescriptionComponent } from './tabs/design-data/name-description/name-description.component';
import { ShapediverComponent } from './tabs/design-data/shapediver/shapediver.component';
import { StatusComponent } from './tabs/design-data/status/status.component';
import { SignoffsComponent } from './tabs/design-data/signoffs/signoffs.component';
import { CategoryComponent } from './tabs/design-data/category/category.component';
import { CompanyComponent } from './tabs/design-data/company/company.component';
import { ImagesComponent } from './tabs/design-data/images/images.component';
import { SliderComponent } from './tabs/design-parameters/slider/slider.component';
import { SelectComponent } from './tabs/design-parameters/select/select.component';
import { TextComponent } from './tabs/design-parameters/text/text.component';
import { ColorComponent } from './tabs/design-parameters/color/color.component';
import { ImageComponent } from './tabs/design-parameters/image/image.component';
import { ToggleComponent } from './tabs/design-parameters/toggle/toggle.component';
import { BlocComponent } from './tabs/design-parameters/bloc/bloc.component';
import { UploadComponent } from './tabs/design-parameters/upload/upload.component';

// Guards
import { AuthGuard } from '../guards/auth.guard';
import { DesignerGuard } from '../guards/designer.guard';



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
};




@NgModule({
    declarations: [
        CreatorStudioComponent,
        DesignListComponent,
        editParameterDialog,
        SubmenuDialog,
        DesignDataComponent,
        DesignParametersComponent,
        DesignPriceComponent,
        DesignSignoffsComponent,
        NameDescriptionComponent,
        ShapediverComponent,
        StatusComponent,
        SignoffsComponent,
        CategoryComponent,
        CompanyComponent,
        ImagesComponent,
        SliderComponent,
        SelectComponent,
        TextComponent,
        ColorComponent,
        ImageComponent,
        ToggleComponent,
        BlocComponent,
        UploadComponent
    ],
    imports : [
      StoreModule.forFeature('designs', designImagesReducer),

        CommonModule,
        FlexLayoutModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarModule,
        TitleBannerModule,
        MarketplaceModule,
        BrowserAnimationsModule,

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
        MatCarouselModule,
        MatTooltipModule,
        MatDialogModule,
        MatToolbarModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatGridListModule,


        DragDropModule,

        Ng5SliderModule,

        //ColorPickerModule,



    ],
    providers   : [
        makDesignEntityService,
        makDesignDataService,
        signoffReqEntityService,
        signoffReqDataService,
        MakDesignsResolver,
        SignoffReqsResolver,
        AuthGuard,
        DesignerGuard,
    ]
})
export class CreatorStudioModule
{


    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private makDesignDataService: makDesignDataService,
        private signoffReqDataService: signoffReqDataService){
            eds.registerMetadataMap(entityMetadata);
            entityDataService.registerService('makDesign', makDesignDataService);
            entityDataService.registerService('signoffReq', signoffReqDataService);
        }

        static forRoot(): ModuleWithProviders<CreatorStudioModule> {
          return {
            ngModule: CreatorStudioModule,
            providers: [
              AuthService,
            ]
          }
        }

}

