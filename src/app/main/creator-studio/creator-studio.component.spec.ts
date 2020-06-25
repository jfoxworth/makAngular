import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContainerRef } from '@angular/core';
import { CreatorStudioComponent } from './creator-studio.component';
import { DesignService } from 'app/main/services/design-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editParameterDialog } from './parameter-dialog/parameter-dialog.component';
import { SubmenuDialog } from './submenu-dialog/submenu-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { mockItems } from 'app/main/services/mockItems';





describe('CreatorStudioComponent', () => {
	
	let component: CreatorStudioComponent;
	let fixture: ComponentFixture<CreatorStudioComponent>;


	// Mock items unique to this page
	let DesignServiceStub : DesignService;
	let	AuthServiceStub : AuthService;
	let	FirebaseServiceStub :FirebaseService;
	let	SnackBarStub : MatSnackBar;
	let	vCRefStub :  ViewContainerRef;


	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub = MockGroup.AngularFireStub();
	const mockDialogRef = MockGroup.DialogRefStub();
	const mockDialog = MockGroup.mockDialog();
	const mockSnackBar = MockGroup.mockSnackBar();





	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CreatorStudioComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ CreatorStudioComponent ],
			providers: [ { provide: MatDialog, 			useValue : mockDialog },
						 { provide: DesignService },
						 { provide: AuthService, 		useValue : {} },
						 { provide: FirebaseService, 	useValue : AngularFireStub },
						 { provide: MatSnackBar, 		useValue : mockSnackBar },
						 { provide: AngularFireStorage, useValue : {} },
						 { provide: ViewContainerRef } ]
		});

		fixture = TestBed.createComponent(CreatorStudioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});



	// Basic test to ensure that the component is created
	it('should create creator studio main', () => {
		expect(component).toBeTruthy();
	});
});



