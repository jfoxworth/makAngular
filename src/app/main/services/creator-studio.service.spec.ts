import { TestBed } from '@angular/core/testing';

import { CreatorStudioService } from './creator-studio.service';





describe('CreatorStudioService', () => {



	let service: CreatorStudioService;




	beforeEach(() => {
	
		TestBed.configureTestingModule({
			imports: [  ],
			providers: [ CreatorStudioService ]
		});
		service = TestBed.inject( CreatorStudioService );
	
	});




	it('should be created', () => {
		expect(service).toBeTruthy();
	});


});
