import { async, ComponentFixture, TestBed, fakeAsync, tick, inject, flush } from '@angular/core/testing';
import { Type } from '@angular/core';
import { EcommerceComponent } from './e-commerce.component';
import { DOCUMENT } from '@angular/common'; 
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";




// Services
import { EcommerceService } from 'app/main/services/e-commerce.service';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { mockItems } from 'app/main/services/mockItems';


describe('EcommerceComponent', () => {
	let component: EcommerceComponent;
	let fixture: ComponentFixture<EcommerceComponent>;


	// Mock Items pulled from external mock file
	let MockGroup 					= new mockItems();
	const AngularFireStub 			= MockGroup.AngularFireStub();
	const mockDialogRef 			= MockGroup.DialogRefStub();
	const mockDialog 				= MockGroup.mockDialog();
	const mockSnackBar 				= MockGroup.mockSnackBar();
	const ActivatedRouteStub 		= MockGroup.ActivatedRouteStub();
	const mockDocumentDialog 		= MockGroup.mockDocumentDialog();
	const AngularFireStorageStub 	= MockGroup.AngularFireStorageStub();
	const MarketplaceServiceStub	= MockGroup.MarketplaceServiceStub();
	const EcommerceServiceStub		= MockGroup.EcommerceServiceStub();


	const service = new EcommerceService();




	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EcommerceComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {


		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule,
					   MatIconModule,
					   MatFormFieldModule,
					   FormsModule,
					   MatTabsModule,
					   MatInputModule,
					   MatDividerModule,
					   RouterTestingModule ],
			declarations: [ EcommerceComponent ],
			providers: [ { provide: EcommerceService },
						 { provide: FirebaseService, 	useValue : AngularFireStub },
						 { provide: MarketplaceService, useValue : {} },
						 { provide: AngularFirestore, 	useValue : {} },
						 { provide: MatSnackBar, 		useValue : mockSnackBar },
						 { provide: AngularFireStorage, useValue : AngularFireStorageStub } ]
		});

		fixture = TestBed.createComponent(EcommerceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});



	/*
	*
	*
	*	UNIT TESTS
	*
	*
	*/

	it('should create the Ecommerce Component', () => {
		expect(component).toBeTruthy();
	});


	it('service should return an array with 7 entries for project stages', () => {
		let tempArray = service.getProductStages();
		expect(tempArray.length).toEqual(7);
	});

	it('service should return an initial stage with the first set to true', () => {
		let tempArray = service.getInitialStageStatus();
		expect(tempArray.length).toEqual(7);
		expect(tempArray[0]).toEqual(true);
		expect(tempArray[1]).toEqual(false);
	});

	it('service should return an initial selected status with the first set to true', () => {
		let tempArray = service.getInitialSelectedStatus();
		expect(tempArray.length).toEqual(7);
		expect(tempArray[0]).toEqual(true);
		expect(tempArray[1]).toEqual(false);
	});


	it('getProductStages should be called in ngOnInit', 
		fakeAsync(() => {
		const mockEcommerceService = fixture.debugElement.injector.get<EcommerceService>(EcommerceService as Type<EcommerceService>);
		spyOn(mockEcommerceService, 'getProductStages');
		component.ngOnInit();
		tick();
		expect(mockEcommerceService.getProductStages).toHaveBeenCalled();
	}));

	it('getInitialStageStatus should be called in ngOnInit', 
		fakeAsync(() => {
		const mockEcommerceService = fixture.debugElement.injector.get<EcommerceService>(EcommerceService as Type<EcommerceService>);
		spyOn(mockEcommerceService, 'getInitialStageStatus');
		component.ngOnInit();
		tick();
		expect(mockEcommerceService.getInitialStageStatus).toHaveBeenCalled();
	}));

	it('getInitialSelectedStatus should be called in ngOnInit', 
		fakeAsync(() => {
		const mockEcommerceService = fixture.debugElement.injector.get<EcommerceService>(EcommerceService as Type<EcommerceService>);
		spyOn(mockEcommerceService, 'getInitialSelectedStatus');
		component.ngOnInit();
		tick();
		expect(mockEcommerceService.getInitialSelectedStatus).toHaveBeenCalled();
	}));


	it('should have a project list after ngOnInit', 
		fakeAsync(() => {
		component.ngOnInit();
		tick();
		expect(component.projectList.length).toBeGreaterThan(0);
	}));



/*
	fit('should call to save changes when project name is blurred', 
		fakeAsync(() => {
			spyOn(component, 'saveProject');
			component.ngOnInit();
			fixture.whenRenderingDone().then(() => {
			    const tabLabels = fixture.debugElement.queryAll(By.css('.mat-tab-label'));
			 	console.log(tabLabels);
			 	tabLabels[1].triggerEventHandler('click', null);
				fixture.detectChanges();
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					const projectName = fixture.debugElement.query(By.css('#projectName'));
					console.log(projectName);
				 	projectName.triggerEventHandler('blur', null);
				});
			});		
			console.log('Lowered expectations');
			expect(component.saveProject).toHaveBeenCalled();
			tick();
		})
	);
*/
/*

	fit('should call to save changes when project name is blurred', 
		fakeAsync(() => {
			component.ngOnInit();
			tick();
		    const tabLabels = fixture.debugElement.queryAll(By.css('.mat-tab-label'));
		 	console.log(tabLabels);
		 	tabLabels[1].triggerEventHandler('click', null);
			fixture.detectChanges();
			fixture.whenStable().then(() => {
				const projectName = fixture.debugElement.query(By.css('#projectName'));
				console.log(projectName);
				let mySpy = spyOn(component, 'saveProject');
			 	projectName.triggerEventHandler('blur', null);
				console.log('Lowered expectations');
				expect(mySpy).toHaveBeenCalled();
			});
		})
	);
*/




});


