

// Base Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';



// Angular Material Items
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';





// Fuse Specific Items
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';





// App Components
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { ProfileModule } from 'app/main/profile/profile.module';
import { InvoiceCompactModule } from 'app/main/invoices/compact/compact.module';
import { InvoiceModernModule } from 'app/main/invoices/modern/modern.module';
import { LoginModule } from 'app/main/login/login.module';
import { RegisterModule } from 'app/main/register/register.module';
import { DesignStudioModule } from 'app/main/design-studio/design-studio.module';
import { DesignSignoffModule } from 'app/main/design-signoff/design-signoff.module';
import { EcommerceModule } from 'app/main/e-commerce/e-commerce.module';
import { ChatComponent } from './main/chat/chat.component';
import { ChatViewComponent } from './main/chat/chat-view/chat-view.component';
import { ChatStartComponent } from './main/chat/chat-start/chat-start.component';
import { ChatModule } from 'app/main/chat/chat.module';
import { KnowledgeBaseModule } from 'app/main/knowledge-base/knowledge-base.module';
import { MarketplaceModule } from 'app/main/marketplace/marketplace.module';
import { CreatorStudioModule } from 'app/main/creator-studio/creator-studio.module';
import { MailConfirmModule } from 'app/main/mail-confirm/mail-confirm.module';




// Google Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';



// Services
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { ChatService } from 'app/main/services/chat.service';
import { DesignStudioService } from 'app/main/services/design-studio.service';
import { KnowledgeBaseService } from 'app/main/services/knowledge-base.service';
import { CreatorStudioService } from 'app/main/services/creator-studio.service';
import { FakeDbService } from 'app/fake-db/fake-db.service';



// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';



// NGRX Items
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './reducers';
import { EntityDataModule } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';





const appRoutes: Routes = [
	{
		path	  : '**',
		redirectTo: 'designStudio'
	}
];

@NgModule({
	declarations: [
		AppComponent,
	],
	imports	 : [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes),

		TranslateModule.forRoot(),
		InMemoryWebApiModule.forRoot(FakeDbService, {
			delay			 : 0,
			passThruUnknownUrl: true
		}),

		// Material moment date module
		MatMomentDateModule,

		// Material
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatSliderModule,
		MatDatepickerModule,
		MatDialogModule,

		// Fuse modules
		FuseModule.forRoot(fuseConfig),
		FuseProgressBarModule,
		FuseSharedModule,
		FuseSidebarModule,
		FuseThemeOptionsModule,

		// App modules
		LayoutModule,
		ProfileModule,
		InvoiceModernModule,
		InvoiceCompactModule,
		LoginModule,
		RegisterModule,
		DesignStudioModule,
		EcommerceModule,
		ChatModule,
		KnowledgeBaseModule,
		StoreModule,
		CreatorStudioModule,
		DragDropModule,
		MailConfirmModule,
		DesignSignoffModule,


		// Firestore Auth Modules
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule,


		Ng5SliderModule,


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
		})

	],
	providers :[
		DesignStudioService,
		KnowledgeBaseService,
		CreatorStudioService,
		AuthService,
		ChatService,
		FirebaseService,
	],
	exports : [
	],
	bootstrap   : [
		AppComponent
	]
})
export class AppModule
{
}
