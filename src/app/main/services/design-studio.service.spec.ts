import { TestBed } from '@angular/core/testing';

import { DesignStudioService } from './design-studio.service';
import { RouterTestingModule } from "@angular/router/testing";


describe('DesignStudioService', () => {

  let service: DesignStudioService;

	beforeEach(() => {

		service = new DesignStudioService();
		TestBed.configureTestingModule({
			imports: [ 
			    RouterTestingModule,
			  ]
		});
		service = TestBed.inject( DesignStudioService );

	});



	it('should be created', () => {
		expect(service).toBeTruthy();
	});


	it ('getMenuLocations should return at least 7 menu locations', () =>{
		const result = service.getMenuLocations();
		expect(result.length).toBeGreaterThan(6);

	});



});
