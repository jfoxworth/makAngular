import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { AnimationBuilder } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';





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


		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule,
					   MatIconModule,
					   MatButtonModule ],
			declarations: [ CarouselComponent,
							MatCarouselComponent ],
			providers: [  ]
						 
		});

		fixture = TestBed.createComponent(CarouselComponent);
		component = fixture.componentInstance;
		component.thisitem = { 'imageUrls' : [] };
		fixture.detectChanges();

	});



	




	it('should create', () => {
		expect(component).toBeTruthy();
	});





});
