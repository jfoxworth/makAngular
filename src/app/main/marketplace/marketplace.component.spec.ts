
/*

	This is the test page for the marketplace component

*/


// Angular Testing Items
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";




// The component being testing
import { MarketplaceComponent } from './marketplace.component';


// Angular Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule } from '@angular/forms';



// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// Services and Mock Items
import { CreatorStudioService } from 'app/main/services/creator-studio.service';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { DesignsService } from 'app/main/services/designs.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';
import { DesignSignoffsService } from 'app/main/services/design-signoffs.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { mockItems } from 'app/main/services/mockItems';



// RXJS Items
import { Observable } from "rxjs/Observable"








describe('MarketplaceComponent', () => {
	
	let component 	: MarketplaceComponent;
	let fixture 	: ComponentFixture<MarketplaceComponent>;

	// Mock Items pulled from external mock file
	let MockGroup 					= new mockItems();
	const AngularFireStub 			= MockGroup.AngularFireStub();
	const mockSnackBar 				= MockGroup.mockSnackBar();
	const AngularFireStorageStub 	= MockGroup.AngularFireStorageStub();
	const CreatorStudioStub 		= MockGroup.mockCreatorStudio();
	const DesignsServiceStub 		= MockGroup.mockDesignsService();
	const SignoffReqsServiceStub 	= MockGroup.mockSignoffReqsService();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MarketplaceComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {
	

		localStorage.setItem('user', JSON.stringify({'uid' : ''})); 


		TestBed.configureTestingModule({
			imports: [ MatIconModule,
					   MatFormFieldModule,
					   MatSelectModule,
					   MatTooltipModule,
					   BrowserAnimationsModule,
					   RouterTestingModule,
					   FormsModule ],
			declarations: [ MarketplaceComponent ],
			providers: [ { provide: CreatorStudioService, 	useValue : CreatorStudioStub },
						 { provide: StoreService, 			useValue : {} },
						 { provide: DesignsService, 		useValue : DesignsServiceStub },
						 { provide: SignoffReqsService, 	useValue : SignoffReqsServiceStub },
						 { provide: DesignSignoffsService, 	useValue : {} },
						 { provide: MatSnackBar, 			useValue : mockSnackBar },
						 { provide: AngularFireStorage, 	useValue : AngularFireStorageStub } ]
						 
		});

		fixture = TestBed.createComponent(MarketplaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});



	/*
	*
	*	Unit test the formatStoreData function
	*
	*/
	it('should call subscribeToData in ngOnInit', fakeAsync(() => {
		spyOn(component, 'subscribeToData');
		component.ngOnInit();
		tick();
		expect(component.subscribeToData).toHaveBeenCalled();
	}));

	it('should call CreatorStudioService.getDesignTypes in ngOnInit', fakeAsync(() => {
		spyOn( CreatorStudioStub, 'getDesignTypes').and.callThrough();
		component.ngOnInit();
		tick();
		expect(CreatorStudioStub.getDesignTypes).toHaveBeenCalled();
	}));





	/*
	*
	*	INTEGRATION TESTS TO ENSURE THAT COMPONENTS ARE SHOWN PROPERLY
	*
	*/
	
	// Generic creation test
	it('marketplace component should be created', () => {
		expect(component).toBeTruthy();
	});


	// Test to ensure that card is created with title
/*
	it('the card for design should be shown', fakeAsync(() => {
		component.ngOnInit();
		let component.storeList = MockGroup.mockStoreData('designs');
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('.siTitle'));
		expect(myDiv.nativeNode.innerHTML).toContain('Fossil Wall');
	}));
*/






});


