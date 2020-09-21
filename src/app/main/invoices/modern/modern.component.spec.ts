
/*

	This is the test file for the invoice component
*/


// Angular Items and test files
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';


// The component
import { InvoiceModernComponent } from './modern.component';


// Services and mock item
import { InvoiceService } from 'app/main/services/invoice.service';
import { DesignsService } from 'app/main/services/designs.service';
import { ProjectsService } from 'app/main/services/projects.service';
import { VersionsService } from 'app/main/services/versions.service';
import { AuthService } from 'app/main/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { mockItems } from 'app/main/services/mockItems';





describe('InvoiceModernComponent', () => {
	let component: InvoiceModernComponent;
	let fixture: ComponentFixture<InvoiceModernComponent>;

	// Mock items unique to this page
	let InvoiceServiceStub : InvoiceService;
	let AuthServiceStub : AuthService;
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
						 { provider: DesignsService },
						 { provider: ProjectsService },
						 { provider: VersionsService },
						 { provide: ActivatedRoute, useValue : ActivatedRouteStub },
						 { provide: AuthService, useValue : {} }]
		});

		fixture = TestBed.createComponent(InvoiceModernComponent);
		component = fixture.componentInstance;
		component.versionData = {
			'id' 			: '',
			'dateCreated'	: Date.now(),
			'creatorId'		: '',
			'creatorName'	: '',
			'description'	: "This is the description of this version",
			'designId' 		: '',
			'initialOpen'	: false,
			'name'			: 'New Version',
			'price'			: 0,
			'projectId'		: '',
			'values'		: [],
			'version'		: 1,
			'deleted' 		: false,
			'measurements' 	: '',
			'tax'			: 0,
			'totalCost'		: 0,
			'deposit'		: 0
		}

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
