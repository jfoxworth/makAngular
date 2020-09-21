
/*

	This is the test file for the profile component

*/


// Standard Angular and Testing components
import { async, ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { By } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable"




// The component
import { ProfileComponent } from './profile.component';



// Angular Material Items
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';




// Services
import { UserService } from 'app/main/services/user-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';

import { mockItems } from 'app/main/services/mockItems';







fdescribe('ProfileComponent', () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;


	// Mock items unique to this page
	let	AuthServiceStub : AuthService;
	let	SnackBarStub : MatSnackBar;
	let	FuseTrans :	FuseTranslationLoaderService;
	let AngularStorageStub : AngularFireStorage;
	let DialogStub : MatDialog;


	// Mock Items pulled from external mock file
	let MockGroup 				= new mockItems();
	const AngularFireStub 		= MockGroup.AngularFireStub();
	const DialogRefStub 		= MockGroup.DialogRefStub();
	const ActivatedRouteStub 	= MockGroup.ActivatedRouteStub();
	const UserServiceStub 		= MockGroup.mockUserService();






	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProfileComponent ]
		})
		.compileComponents();
	}));





	beforeEach(() => {

		
		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule,
					   MatIconModule,
					   MatInputModule,
					   TextFieldModule ],
			declarations: [ ProfileComponent ],
			providers: [ { provide: FuseTranslationLoaderService, 	useValue : FuseTranslationLoaderService },
						 { provide: ActivatedRoute, 				useValue : ActivatedRouteStub },
						 { provide: MatDialog, 						useValue : DialogStub },
						 { provide: UserService, 					useValue : UserServiceStub },
						 { provide: AuthService, 					useValue : AuthServiceStub },
						 { provide: MatSnackBar, 					useValue : SnackBarStub },
						 { provide: AngularFireStorage, 			useValue : AngularStorageStub } ]

		});
		


		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();


	});





	/*
	*
	*	UNIT TESTS
	*
	*/

	// Create the component without a user logged in
	it('should create main profile component with user from URL - no user', () => {
		expect(component).toBeTruthy();
	});

	// Create the component with a user logged in
	it('should create main profile component with user from URL - with user', () => {
		component.ngOnInit();
		expect(component).toBeTruthy();
	});

	// Ensure that no edit button is available
	it('should not have edit button with no user', fakeAsync(() => {
		localStorage.removeItem('userData');
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#editButton'));
		expect(myDiv).toBeNull();
	}));

/*
	// Ensure that no edit button is available
	it('should not have edit button with different users in URL vs memory', fakeAsync(() => {
		const userItem = JSON.stringify({
			'uid' : '2',
			'designer' : false,
			'email' : 'jfoxworth@cadwolf.com',
			'displayName' : 'the wolf',
			'title' : 'CEO / Hero',
			'shortBio' : 'This is the short bio',
			'website' : 'www.joshuafoxworth.com'
		});
		localStorage.setItem('userData', userItem);
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#editButton'));
		expect(myDiv).toBeNull();
	}));
*/
/*
	// Ensure that edit button exists
	it('should have an edit button', fakeAsync(() => {
		const userItem = JSON.stringify({
			'uid' : '1',
			'designer' : false,
			'email' : 'jfoxworth@cadwolf.com',
			'displayName' : 'the wolf',
			'title' : 'CEO / Hero',
			'shortBio' : 'This is the short bio',
			'website' : 'www.joshuafoxworth.com'
		});
		localStorage.setItem('userData', userItem);
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#editButton'));
		expect(myDiv).not.toBeNull();
	}));
*/

/*
	// Ensure that edit mode is engaged when button is clicked
	it('should go to edit mode when button is clicked', fakeAsync(() => {
		const userItem = JSON.stringify({
			'uid' : '1',
			'designer' : false,
			'email' : 'jfoxworth@cadwolf.com',
			'displayName' : 'the wolf',
			'title' : 'CEO / Hero',
			'shortBio' : 'This is the short bio',
			'website' : 'www.joshuafoxworth.com'
		});
		localStorage.setItem('userData', userItem);
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#editButton')).triggerEventHandler('click', null);
		expect(component.displayStyle).toEqual('edit');
	}));



	// Ensure that display mode appears when finished button is clicked
	it('should go to display mode when button is clicked', fakeAsync(() => {
		const userItem = JSON.stringify({
			'uid' : '1',
			'designer' : false,
			'email' : 'jfoxworth@cadwolf.com',
			'displayName' : 'the wolf',
			'title' : 'CEO / Hero',
			'shortBio' : 'This is the short bio',
			'website' : 'www.joshuafoxworth.com'
		});
		localStorage.setItem('userData', userItem);
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#editButton')).triggerEventHandler('click', null);
		fixture.detectChanges();
		const newDiv = fixture.debugElement.query(By.css('#doneEditing')).triggerEventHandler('click', null);
		fixture.detectChanges();
		expect(component.displayStyle).toEqual('display');
	}));





	/*
	*
	*	INTEGRATION TESTS
	*
	*/

	// Test the user email
	it('should test the user email with user from URL', fakeAsync(() => {
		const userItem = JSON.stringify({
			'uid' : '1',
			'designer' : false,
			'email' : 'jfoxworth@cadwolf.com',
			'displayName' : 'the wolf',
			'title' : 'CEO / Hero',
			'shortBio' : 'This is the short bio',
			'website' : 'www.joshuafoxworth.com'
		});
		localStorage.setItem('userData', userItem);
		component.dataFlag = true;
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#userEmail'));
		console.log('The div is ...');
		console.log(myDiv);
		expect(myDiv).not.toBeNull();
		expect(myDiv.nativeNode.innerHTML).toContain('jfoxworth@cadwolf.com');
	}));


	// Test the user display name
	it('should test the display name with user from URL', fakeAsync(() => {
		const userItem = JSON.stringify({
			'uid' : '1',
			'designer' : false,
			'email' : 'jfoxworth@cadwolf.com',
			'displayName' : 'the wolf',
			'title' : 'CEO / Hero',
			'shortBio' : 'This is the short bio',
			'website' : 'www.joshuafoxworth.com'
		});
		localStorage.setItem('userData', userItem);
		component.dataFlag = true;
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#userDisplayName'));
		expect(myDiv).not.toBeNull();
		expect(myDiv.nativeNode.innerHTML).toContain('the wolf');
	}));



	// Test the user title
	it('should test the user title with user from URL', fakeAsync(() => {
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#userTitle'));
		expect(myDiv).not.toBeNull();
		expect(myDiv.nativeNode.innerHTML).toContain('CEO / Hero');
	}));


	// Test the user short bio
	it('should test the user short bio with user from URL', fakeAsync(() => {
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#userShortBio'));
		expect(myDiv).not.toBeNull();
		expect(myDiv.nativeNode.innerHTML).toContain('This is the short bio');
	}));



});







/*
*
*
*	These are tests that are carried out with a separate route mock. This mock
* 	returns nothing so that we can test that case
*
*/






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
	let MockGroup 				= new mockItems();
	const AngularFireStub 		= MockGroup.AngularFireStub();
	const DialogRefStub 		= MockGroup.DialogRefStub();
	const ActivatedRouteStub 	= MockGroup.ActivatedRouteEmptyStub();
	const UserServiceStub 		= MockGroup.mockUserService();






	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProfileComponent ]
		})
		.compileComponents();
	}));





	beforeEach(() => {

		
		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule,
					   MatIconModule,
					   MatInputModule ],
			declarations: [ ProfileComponent ],
			providers: [ { provide: FuseTranslationLoaderService, 	useValue : FuseTranslationLoaderService },
						 { provide: ActivatedRoute, 				useValue : ActivatedRouteStub },
						 { provide: MatDialog, 						useValue : DialogStub },
						 { provide: UserService, 					useValue : UserServiceStub },
						 { provide: AuthService, 					useValue : AuthServiceStub },
						 { provide: FirebaseService, 				useValue : AngularFireStub },
						 { provide: AngularFirestore, 				useValue : AngularFirestore },
						 { provide: MatSnackBar, 					useValue : SnackBarStub },
						 { provide: AngularFireStorage, 			useValue : AngularStorageStub } ]

		});
		
		const userItem = JSON.stringify({
			'uid' : '1',
			'designer' : false,
			'email' : 'jfoxworth@cadwolf.com',
			'displayName' : 'the wolf',
			'title' : 'CEO / Hero',
			'shortBio' : 'This is the short bio',
			'website' : 'www.joshuafoxworth.com'
		});
		localStorage.setItem('userData', userItem);


		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});







	/*
	*
	*	UNIT TESTS
	*
	*/

	// Create the component with a user logged in
	it('should create main profile component with logged in user', () => {

		console.log('The user data is ...');
		console.log((localStorage.getItem('userData')));
		component.ngOnInit();
		expect(component).toBeTruthy();
	});







	/*
	*
	*	INTEGRATION TESTS
	*
	*/

	// Test the user email
	it('should test the user email with logged in user', fakeAsync(() => {
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#userEmail'));
		expect(myDiv).not.toBeNull();
		expect(myDiv.nativeNode.innerHTML).toContain('jfoxworth@cadwolf.com');
	}));


	// Test the user display name
	it('should test the display name with logged in user', fakeAsync(() => {
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#userDisplayName'));
		expect(myDiv).not.toBeNull();
		expect(myDiv.nativeNode.innerHTML).toContain('the wolf');
	}));



	// Test the user title
	it('should test the user title with logged in user', fakeAsync(() => {
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#userTitle'));
		expect(myDiv).not.toBeNull();
		expect(myDiv.nativeNode.innerHTML).toContain('CEO / Hero');
	}));


	// Test the user short bio
	it('should test the user short bio with logged in user', fakeAsync(() => {
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#userShortBio'));
		expect(myDiv).not.toBeNull();
		expect(myDiv.nativeNode.innerHTML).toContain('This is the short bio');
	}));



	// Create the no user text if there is no user logged in and no URL
	it('should create the no user text', fakeAsync(() => {
		localStorage.removeItem('userData');
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#noUserText'));
		expect(myDiv).not.toBeNull();
		expect(myDiv.nativeNode.innerHTML).toContain('No user selected and no user logged in');
	}));




});


