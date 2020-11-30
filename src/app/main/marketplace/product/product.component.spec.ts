
/*

	This is the test file for the product component of the marketplace

*/


// Angular common and testing items
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { By } from "@angular/platform-browser";
import { Observable } from 'rxjs';
import { RouterTestingModule } from "@angular/router/testing";



// The components
import { MarketplaceProductComponent } from './product.component';




// Angular Material Items
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';


// Services
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { ProjectsService } from 'app/main/services/projects.service';
import { DesignsService } from 'app/main/services/designs.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';
import { mockItems } from 'app/main/services/mockItems';



describe('MarketplaceProductComponent', () => {
	let component: MarketplaceProductComponent;
	let fixture: ComponentFixture<MarketplaceProductComponent>;


	// Mock items unique to this page
	let MarketplaceServiceStub : MarketplaceService;


	// Mock Items pulled from external mock file
	let MockGroup 					= new mockItems();
	const AngularFireStub 			= MockGroup.AngularFireStub();
	const ActivatedRouteStub 		= MockGroup.ActivatedRouteStub();
	const AngularFireStorageStub 	= MockGroup.AngularFireStorageStub();
	const CreatorStudioStub 		= MockGroup.mockCreatorStudio();
	const DesignsServiceStub 		= MockGroup.mockDesignsService();
	const ProjectsServiceStub 		= MockGroup.mockProjectsService();
	const SignoffReqsServiceStub 	= MockGroup.mockSignoffReqsService();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MarketplaceProductComponent ]
		})
		.compileComponents();
	}));




	beforeEach(() => {

		TestBed.configureTestingModule({
			imports : [ MatIconModule,
						MatInputModule,
						MatGridListModule,
						MatTooltipModule,
						MatDividerModule,
						RouterTestingModule
			],
			declarations: [ MarketplaceProductComponent ],
			providers: [ 

						 { provide: ActivatedRoute, 		useValue : ActivatedRouteStub },
						 { provide: DesignsService, 		useValue : DesignsServiceStub },
						 { provide: ProjectsService, 		useValue : ProjectsServiceStub },
						 { provide: SignoffReqsService, 	useValue : SignoffReqsServiceStub },
						 { provide: AngularFireStorage, 	useValue : AngularFireStorageStub },
						 { provide: MarketplaceService, 	useValue : MarketplaceServiceStub }]
			});


		fixture = TestBed.createComponent(MarketplaceProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});







	/*
	*
	*	Unit test the formatStoreData function
	*
	*/

	/*
	it('should call formatData in ngOnInit', fakeAsync(() => {
		spyOn(component, 'formatData');
		component.ngOnInit();
		tick();
		expect(component.formatData).toHaveBeenCalled();
	}));
	*/

	it('should have an add project button when a user is logged in', fakeAsync(() => {
		localStorage.setItem('user', JSON.stringify({'uid':1, 'id':1}))
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#addProjectButton'));
		expect(myDiv).toBeTruthy();
	}));

	it('should not have an add project button when there is no logged in user', fakeAsync(() => {
		localStorage.removeItem('user');
		component.ngOnInit();
		component.dataFlag = true;
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#addProjectButton'));
		expect(myDiv).not.toBeNull();
	}));

	it('should call the add project button when button is pressed', fakeAsync(() => {
		localStorage.setItem('user', JSON.stringify({'uid':1, 'id':1}))
		component.ngOnInit();
		tick();
		spyOn(component, 'addProject');
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#addProjectButton')).triggerEventHandler('click', null);
		expect(component.addProject).toHaveBeenCalled();
	}));

	it('should have a button to show item in design studio', fakeAsync(() => {
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('#viewDesignStudioButton'));
		expect(myDiv).toBeTruthy();
	}));






	/*
	*
	*	INTEGRATION TESTS TO ENSURE THAT COMPONENTS ARE SHOWN PROPERLY
	*
	*/

	it('should create marketplace product', () => {
		expect(component).toBeTruthy();
	});

	it('The proper card title should be shown', fakeAsync(() => {
		localStorage.setItem('user', JSON.stringify({'uid':1, 'id':1}))
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('.itemTypeTitle'));
		expect(myDiv.nativeNode.innerHTML).toContain('Planter Bench');
	}));

	it('The proper type should be shown', fakeAsync(() => {
		localStorage.setItem('user', JSON.stringify({'uid':1, 'id':1}))
		component.ngOnInit();
		component.dataFlag = true;
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('.itemTypeText'));
		expect(myDiv.nativeNode.innerHTML).toContain('Seating');
	}));

	it('The proper type should be shown', fakeAsync(() => {
		localStorage.setItem('user', JSON.stringify({'uid':1, 'id':1}))
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('.itemDescription'));
		expect(myDiv.nativeNode.innerHTML).toContain('This bench has two seating areas with a twisting section connecting them. The width and depth of the bench can be set as well as the length of each seating area and the length of the twisting section. There can also be a planter in the seating section.');
	}));

	it('The proper company name should be shown', fakeAsync(() => {
		localStorage.setItem('user', JSON.stringify({'uid':1, 'id':1}))
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('.itemCompanyName'));
		expect(myDiv.nativeNode.innerHTML).toContain('MAK Studio');
	}));

	it('The proper company location should be shown', fakeAsync(() => {
		localStorage.setItem('user', JSON.stringify({'uid':1, 'id':1}))
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.query(By.css('.itemCompanyLocation'));
		expect(myDiv.nativeNode.innerHTML).toContain('Houston, Texas');
	}));



});
