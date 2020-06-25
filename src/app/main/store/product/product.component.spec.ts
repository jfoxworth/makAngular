import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreProductComponent } from './product.component';

import { ActivatedRoute } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatButtonModule } from '@angular/material/button';

// Services
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';

import { mockItems } from 'app/main/services/mockItems';



describe('StoreProductComponent', () => {
	let component: StoreProductComponent;
	let fixture: ComponentFixture<StoreProductComponent>;


	// Mock items unique to this page
	let MarketplaceServiceStub : MarketplaceService;


	// Mock Items pulled from external mock file
	let MockGroup 			= new mockItems();
	const AngularFireStub 	= MockGroup.AngularFireStub();
	const ActivatedRouteStub = MockGroup.ActivatedRouteStub();




	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ StoreProductComponent ]
		})
		.compileComponents();
	}));




	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ StoreProductComponent ],
			providers: [ 

						 { provide: ActivatedRoute, useValue : ActivatedRouteStub },
						 { provide: FirebaseService, useValue : AngularFireStub },
						 { provide: AngularFireStorage, useValue : {} },
						 { provide: MarketplaceService, useValue : MarketplaceServiceStub }]
			});


		fixture = TestBed.createComponent(StoreProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});




	it('should create store product', () => {
		expect(component).toBeTruthy();
	});



});
