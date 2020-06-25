import { ChatService } from 'app/main/services/chat.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { mockItems } from 'app/main/services/mockItems';



describe('ChatService', () => {

	let service: ChatService;

	

	beforeEach(() => {

		//service = new ChatService( {} );
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ ChatService ]
		});
		service = TestBed.inject( ChatService );

	});

	

	it('should be initialized', inject([ ChatService ], (service: ChatService) => {
		expect(service).toBeTruthy();
	}));

	//it('The chat service should be created', () => {
	//	expect(service).toBeTruthy();
	//});



});
