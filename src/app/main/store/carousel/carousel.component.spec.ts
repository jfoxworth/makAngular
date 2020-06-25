import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';


describe('CarouselComponent', () => {
	let component: CarouselComponent;
	let fixture: ComponentFixture<CarouselComponent>;

	

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CarouselComponent ]
		})
		.compileComponents();
	}));

	


	beforeEach(() => {
		fixture = TestBed.createComponent(CarouselComponent);
		component = fixture.componentInstance;
		component.thisitem = { 'imageUrls' : [] };
		fixture.detectChanges();

	});

	




	it('should create', () => {
		expect(component).toBeTruthy();
	});





});
