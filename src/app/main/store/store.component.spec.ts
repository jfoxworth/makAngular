import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreComponent } from './store.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';
import { DesignService } from 'app/main/services/design-service.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from '@angular/forms';
import { By } from "@angular/platform-browser";



import { mockItems } from 'app/main/services/mockItems';
import { Observable } from "rxjs/Observable"


describe('StoreComponent', () => {
	
	let component: StoreComponent;
	let fixture: ComponentFixture<StoreComponent>;

	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub = MockGroup.AngularFireStub();
	const mockSnackBar = MockGroup.mockSnackBar();
	const AngularFireStorageStub = MockGroup.AngularFireStorageStub();



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ StoreComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {
	
		TestBed.configureTestingModule({
			imports: [ MatIconModule,
					   MatFormFieldModule,
					   MatSelectModule,
					   MatTooltipModule,
					   BrowserAnimationsModule,
					   RouterTestingModule,
					   FormsModule ],
			declarations: [ StoreComponent ],
			providers: [ { provide: DesignService },
						 { provide: FirebaseService, useValue : AngularFireStub },
						 { provide: MatSnackBar, useValue : mockSnackBar },
						 { provide: AngularFireStorage, useValue : AngularFireStorageStub } ]
						 
		});

		fixture = TestBed.createComponent(StoreComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});






	/*
	*
	*	Unit test the formatStoreData function
	*
	*/
	it('should call formatStoreData in ngOnInit', fakeAsync(() => {
		spyOn(component, 'formatStoreData');
		component.ngOnInit();
		tick();
		expect(component.formatStoreData).toHaveBeenCalled();
	}));

	it('Ensure that formatStoreData sets the imageUrls', fakeAsync(() => {
		component.ngOnInit();
		tick();
		expect(component.storeList[0]['imageUrls'].length).toBeGreaterThan(0);

	}));

	it('Ensure that formatStoreData sets the background image', fakeAsync(() => {
		component.ngOnInit();
		tick();
		expect(component.storeList[0]['background']).toBeTruthy();

	}));

	it('Ensure that formatStoreData sets the image URLs', fakeAsync(() => {
		component.ngOnInit();
		tick();
		expect(component.storeList[0]['imageUrls'].length).toBeGreaterThan(0);

	}));







	/*
	*
	*	INTEGRATION TESTS TO ENSURE THAT COMPONENTS ARE SHOWN PROPERLY
	*
	*/
	
	// Generic creation test
	it('store component should be created', () => {
		expect(component).toBeTruthy();
	});


	// Test to ensure that card is created with title
	it('the card for design should be shown', fakeAsync(() => {
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('.siTitle'));
		expect(myDiv.nativeNode.innerHTML).toContain('Fossil Wall');
	}));






});


