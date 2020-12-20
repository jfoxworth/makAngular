
// Common Angular Items
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';



// Mak Studio Modules
import { LoginModule } from './main/Common/login/login.module';
import { ProfileModule } from './main/profile/profile.module';
import { NavbarModule } from './main/Shared/navbar/navbar.module';
import { MarketplaceModule } from './main/marketplace/marketplace.module';
import { DesignStudioModule } from './main/design-studio/design-studio.module';
import { ProjectsModule } from './main/projects/projects.module';
import { KnowledgeBaseModule } from './main/knowledge-base/knowledge-base.module';
import { CreatorStudioModule } from './main/creator-studio/creator-studio.module';
import { ChatModule } from './main/chat/chat.module';
import { TitleBannerModule } from './main/Shared/title-banner/title-banner.module';
import { InvoiceModernModule } from './main/invoices/modern/modern.module';
import { CommercialModule } from './main/commercial/commercial.module';

// Google Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';


// NGRX Items
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from '../app/main/store/reducers';
import { EntityDataModule } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { designImagesReducer } from '../app/main/store/reducers';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Standard modules
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule,
    CommercialModule,

    // Mak modules
    LoginModule,
    NavbarModule,
    ProfileModule,
    MarketplaceModule,
    DesignStudioModule,
    ProjectsModule,
    KnowledgeBaseModule,
    CreatorStudioModule,
    ChatModule,
    TitleBannerModule,
    InvoiceModernModule,

    // Firestore Auth Modules
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule,


    // NGRX items
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks : {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictActionSerializability: true,
				strictStateSerializability:true
			}
		}),
		StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
		EffectsModule.forRoot([]),
		EntityDataModule.forRoot({}),
		StoreRouterConnectingModule.forRoot({
			stateKey: 'router',
			routerState: RouterState.Minimal
		}),
		//StoreModule.forRoot({}, {}),
		StoreModule.forRoot({images:designImagesReducer }, {}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
