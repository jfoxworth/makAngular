import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from "rxjs/Observable"


// Services
import { UserService } from 'app/main/services/user-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';

import { mockItems } from 'app/main/services/mockItems';



// Class to hold the userData object
class UserServiceStub {
  uid = 'mmAvAdd1GlgBebdV85OVRE1CSK43';
};



class AngularFireStub {
    getDocsByUserId = (_d: any) => new Promise((resolve, _reject) => resolve({data:()=>{}}));
    getDocById = (_d: any) => new Promise((resolve, _reject) => resolve({data:()=>{}}));
    getDocsByParam = (_d: any) => new Observable((observer) => {}) 
}		




describe('ProfileComponent', () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;


	// Mock items unique to this page
	let	AuthServiceStub : AuthService;
	let	SnackBarStub : MatSnackBar;
	let	FuseTrans :	FuseTranslationLoaderService;
	let AngularStorageStub : AngularFireStorage;
	let DialogStub : MatDialog;


	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub = MockGroup.AngularFireStub();
	const DialogRefStub = MockGroup.DialogRefStub();
	const ActivatedRouteStub = MockGroup.ActivatedRouteStub();






	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProfileComponent ]
		})
		.compileComponents();
	}));





	beforeEach(() => {

		/*
		TestBed.configureTestingModule({
			declarations: [ ProfileComponent ],
			providers: [ { provide: FuseTranslationLoaderService, 	useValue : FuseTranslationLoaderService },
						 { provide: ActivatedRoute, 				useValue : ActivatedRouteStub },
						 { provide: MatDialog, 						useValue : DialogStub },
						 { provide: UserService, 					useClass : UserServiceStub },
						 { provide: AuthService, 					useValue : AuthServiceStub },
						 { provide: FirebaseService, 				useValue : AngularFireStub },
						 { provide: MatSnackBar, 					useValue : SnackBarStub },
						 { provide: AngularFireStorage, 			useValue : AngularStorageStub } ]

		});
		*/

		TestBed.configureTestingModule({
			declarations: [ ProfileComponent ],
			providers: [ { provide: FuseTranslationLoaderService, 	useValue : {} },
						 { provide: ActivatedRoute, 				useValue : {} },
						 { provide: MatDialog, 						useValue : {} },
						 { provide: UserService, 					useValue : {} },
						 { provide: AuthService, 					useValue : {} },
						 { provide: FirebaseService, 				useValue : {} },
						 { provide: MatSnackBar, 					useValue : {} },
						 { provide: AngularFireStorage, 			useValue : {} } ]

		});


		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});




	// Create the component
	it('should create main profile component', () => {
		expect(component).toBeTruthy();
	});


	/*
	*
	*	TESTS FOR NGONINIT
	*
	*/


	// 
	it('should create main profile component', () => {

		localStorage.setItem('userData', JSON.stringify({'uid' : 'mmAvAdd1GlgBebdV85OVRE1CSK43'}));

		component.ngOnInit();

		expect(component).toBeTruthy();
	});

});


