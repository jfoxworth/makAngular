import { TestBed } from '@angular/core/testing';

import { DesignService } from './design-service.service';





describe('DesignService', () => {



	let service: DesignService;




	beforeEach(() => {
	
		TestBed.configureTestingModule({
			imports: [  ],
			providers: [ DesignService ]
		});
		service = TestBed.inject( DesignService );
	
	});




	it('should be created', () => {
		expect(service).toBeTruthy();
	});


});
