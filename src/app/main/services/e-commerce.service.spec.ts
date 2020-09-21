import { TestBed } from '@angular/core/testing';

import { EcommerceService } from './e-commerce.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClient } from '@angular/common/http';



describe('EcommerceService', () => {

  let service: EcommerceService;

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [ 
			    RouterTestingModule,
			  ]
		});
		service = TestBed.inject( EcommerceService );

	});



	it('should be created', () => {
		expect(service).toBeTruthy();
	});



});

