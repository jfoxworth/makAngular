/*

	This is the test file for the creator studio component

*/



// Angular Testing Items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewContainerRef } from '@angular/core';




// The component
import { CreatorStudioComponent } from './creator-studio.component';




// The services and mock items
import { CreatorStudioService } from 'app/main/services/creator-studio.service';
import { AuthService } from 'app/main/services/auth.service';
import { VersionsService } from 'app/main/services/versions.service';
import { ProjectsService } from 'app/main/services/projects.service';
import { DesignsService } from 'app/main/services/designs.service';
import { UserService } from 'app/main/services/user-service.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { mockItems } from 'app/main/services/mockItems';




// Dialog Items
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editParameterDialog } from './parameter-dialog/parameter-dialog.component';
import { SubmenuDialog } from './submenu-dialog/submenu-dialog.component';




// Angular Material Items
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';






describe('CreatorStudioComponent', () => {
	
	let component: CreatorStudioComponent;
	let fixture: ComponentFixture<CreatorStudioComponent>;


	// Mock items unique to this page
	let	AuthServiceStub : AuthService;
	let	SnackBarStub : MatSnackBar;
	let	vCRefStub :  ViewContainerRef;


	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub 			= MockGroup.AngularFireStub();
	const mockDialogRef 			= MockGroup.DialogRefStub();
	const mockDialog 				= MockGroup.mockDialog();
	const mockSnackBar 				= MockGroup.mockSnackBar();
	const CreatorStudioStub 		= MockGroup.mockCreatorStudio();
	const UserServiceStub 			= MockGroup.mockUserService();
	const DesignsServiceStub 		= MockGroup.mockDesignsService();
	const ProjectsServiceStub 		= MockGroup.mockProjectsService();
	const VersionsServiceStub 		= MockGroup.mockVersionsService();
	const SignoffReqsServiceStub 	= MockGroup.mockSignoffReqsService();
	const ActivatedRouteStub 		= MockGroup.ActivatedRouteStub();
	const AuthStub 					= MockGroup.AngularAuthStub();




	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CreatorStudioComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ CreatorStudioComponent ],
			providers: [ { provide: MatDialog, 				useValue : mockDialog },
						 { provide: CreatorStudioService,	useValue : CreatorStudioStub },
						 { provide: VersionsService, 		useValue : VersionsServiceStub },
						 { provide: ProjectsService,		useValue : ProjectsServiceStub },
						 { provide: DesignsService, 		useValue : DesignsServiceStub },
						 { provide: UserService,			useValue : UserServiceStub },
						 { provide: SignoffReqsService,		useValue : SignoffReqsServiceStub },
						 { provide: AuthService, 			useValue : {} },
						 { provide: MatSnackBar, 			useValue : mockSnackBar },
						 { provide: AngularFireStorage, 	useValue : {} },
						 { provide: ViewContainerRef } ]
		});

		fixture = TestBed.createComponent(CreatorStudioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});



	// Basic test to ensure that the component is created
	it('should create creator studio main', () => {
		localStorage.setItem('user', JSON.stringify({'uid':1, 'id':1}));
		component.ngOnInit();
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});
});




