import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignStudioComponent } from './design-studio.component';
import { DOCUMENT } from '@angular/common'; 
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';


// Services
import { DesignStudioService } from 'app/main/services/design-studio.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { mockItems } from 'app/main/services/mockItems';


describe('DesignStudioComponent', () => {
	let component: DesignStudioComponent;
	let fixture: ComponentFixture<DesignStudioComponent>;

	// Mock items unique to this page
	let DesignStudioServiceStub : DesignStudioService;
	let	AuthServiceStub : AuthService;
	let	FirebaseServiceStub :FirebaseService;
	let	SnackBarStub : MatSnackBar;


	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub = MockGroup.AngularFireStub();
	const mockDialogRef = MockGroup.DialogRefStub();
	const mockDialog = MockGroup.mockDialog();
	const mockSnackBar = MockGroup.mockSnackBar();
	const ActivatedRouteStub = MockGroup.ActivatedRouteStub();
	const mockDocumentDialog = MockGroup.mockDocumentDialog();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DesignStudioComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ DesignStudioComponent ],
			providers: [ { provide: DesignStudioService },
						 { provide: ActivatedRoute, useValue : ActivatedRouteStub },
						 { provide: AuthService, useValue : {} },
						 { provide: FirebaseService, useValue : AngularFireStub },
						 { provide: AngularFireStorage, useValue : {} },
						 { provide: ActivatedRoute, useValue : ActivatedRouteStub },
						 { provide: MatSnackBar, useValue : mockSnackBar },
						 { provide: DOCUMENT, useValue : mockDocumentDialog } ]
		});

		fixture = TestBed.createComponent(DesignStudioComponent);
		component = fixture.componentInstance;
		component.designData = MockGroup.mockDesignData();
		component.versionList = [];
		fixture.detectChanges();
	});

	it('should create the Design Studio', () => {
		expect(component).toBeTruthy();
	});
});


