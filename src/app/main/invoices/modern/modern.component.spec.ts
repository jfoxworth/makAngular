import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceModernComponent } from './modern.component';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';


// Services
import { InvoiceService } from 'app/main/services/invoice.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';

import { mockItems } from 'app/main/services/mockItems';



describe('InvoiceModernComponent', () => {
	let component: InvoiceModernComponent;
	let fixture: ComponentFixture<InvoiceModernComponent>;

	// Mock items unique to this page
	let InvoiceServiceStub : InvoiceService;
	let AuthServiceStub : AuthService;
	let FirebaseServiceStub :FirebaseService;
	let RouteStub : ActivatedRoute;

	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub = MockGroup.AngularFireStub();
	const ActivatedRouteStub = MockGroup.ActivatedRouteStub();



	beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ InvoiceModernComponent ]
	})
	.compileComponents();
	}));




	beforeEach(() => {

	
		TestBed.configureTestingModule({
			declarations: [ InvoiceModernComponent ],
			providers: [ { provide: InvoiceService, useValue : {} },
						 { provide: ActivatedRoute, useValue : ActivatedRouteStub },
						 { provide: AuthService, useValue : {} },
						 { provide: FirebaseService, useValue : AngularFireStub } ]
		});

		fixture = TestBed.createComponent(InvoiceModernComponent);
		component = fixture.componentInstance;
		component.versionData = {};
		fixture.detectChanges();

	});



	it('should create modern quote component', () => {
		expect(component).toBeTruthy();
	});




	/*
	*
	*  Calculate costs unit tests
	*
	*/
	it('calculateCosts should calculate tax properly',() => {
		component.versionData.price = 1000;
		component.calculateCosts();
		expect(component.versionData.tax).toEqual(82.50);
	});

	it('calculateCosts should calculate total cost properly', () => {
		component.versionData.price = 1000;
		component.calculateCosts();
		expect(component.versionData.totalCost).toEqual(1082.50);
	});

	it('calculateCosts should calculate total cost properly', () => {
		component.versionData.price = 1000;
		component.calculateCosts();
		expect(component.versionData.deposit).toEqual(270.63);
	});

	it('should call calculateCosts in ngOnInit', fakeAsync(() => {
		spyOn(component, 'calculateCosts');
		component.ngOnInit();
		tick();
		expect(component.calculateCosts).toHaveBeenCalled();
	}));





	/*
	*
	* 	Format Values unit tests
	*
	*/
	it('formatValues should put proper elements in measurements array', () => {
		component.measurements = [];
		component.versionData.values = {'length':100, 'width':4,'design':'Texas'};
		component.formatValues();
		expect(component.measurements).toContain({'name':'length', 'value':100});
		expect(component.measurements).toContain({'name':'width', 'value':4});
		expect(component.measurements).toContain({'name':'design', 'value':'Texas'});
	});

	it('should call format values in ngOnInit', fakeAsync(() => {
		spyOn(component, 'formatValues');
		component.ngOnInit();
		tick();
		expect(component.formatValues).toHaveBeenCalled();
	}));






});
