import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceService } from 'app/main/services/invoice.service';
import { InvoiceCompactComponent } from './compact.component';

describe('InvoiceCompactComponent', () => {
	let component: InvoiceCompactComponent;
	let fixture: ComponentFixture<InvoiceCompactComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InvoiceCompactComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {


		TestBed.configureTestingModule({
			declarations: [ InvoiceCompactComponent ],
			providers: [ { provide: InvoiceService, useValue : {} } ]
		});

		fixture = TestBed.createComponent(InvoiceCompactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});



	it('should create compact quote', () => {
		expect(component).toBeTruthy();
	});


});
