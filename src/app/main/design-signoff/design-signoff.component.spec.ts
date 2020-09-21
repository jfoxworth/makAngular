/*

  This is the test file for the creator studio component

*/



// Angular Testing Items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewContainerRef } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';



// The component
import { DesignSignoffComponent } from './design-signoff.component';



// The services and mock items
import { CreatorStudioService } from 'app/main/services/creator-studio.service';
import { AuthService } from 'app/main/services/auth.service';
import { VersionsService } from 'app/main/services/versions.service';
import { ProjectsService } from 'app/main/services/projects.service';
import { DesignsService } from 'app/main/services/designs.service';
import { UserService } from 'app/main/services/user-service.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';
import { DesignSignoffsService } from 'app/main/services/design-signoffs.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { mockItems } from 'app/main/services/mockItems';



// Angular Material Items
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';







describe('DesignSignoffComponent', () => {
	
	let component: DesignSignoffComponent;
	let fixture: ComponentFixture<DesignSignoffComponent>;





	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const DesignsServiceStub 		= MockGroup.mockDesignsService();
	const ProjectsServiceStub 		= MockGroup.mockProjectsService();
	const VersionsServiceStub 		= MockGroup.mockVersionsService();
	const UserServiceStub 			= MockGroup.mockUserService();
	const SignoffReqsServiceStub 	= MockGroup.mockSignoffReqsService();
	const DesignSignoffServiceStub 	= MockGroup.mockDesignSignoffService();
	const ActivatedRouteStub 		= MockGroup.ActivatedRouteStub();






	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DesignSignoffComponent ]
		})
		.compileComponents();
	}));





	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ DesignSignoffComponent ],
			providers: [ { provide: DesignsService, 		useValue : DesignsServiceStub },
						 { provide: ProjectsService,		useValue : ProjectsServiceStub },
						 { provide: VersionsService, 		useValue : VersionsServiceStub },
						 { provide: UserService,			useValue : UserServiceStub },
						 { provide: SignoffReqsService,		useValue : SignoffReqsServiceStub },
						 { provide: DesignSignoffsService, 	useValue : DesignSignoffServiceStub },
						 { provide: ActivatedRoute, 		useValue : ActivatedRouteStub } ]
		});

		fixture = TestBed.createComponent(DesignSignoffComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});


		beforeEach(() => {
		fixture = TestBed.createComponent(DesignSignoffComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

  




	it('should create', () => {
		localStorage.setItem('user', JSON.stringify({'uid':1, 'id':1}));
		expect(component).toBeTruthy();
	});




});

