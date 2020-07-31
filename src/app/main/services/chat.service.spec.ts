import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { mockItems } from 'app/main/services/mockItems';


// Services
import { ChatService } from 'app/main/services/chat.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from 'app/main/services/user-service.service';




describe('ChatService', () => {

	let service: ChatService;


	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub = MockGroup.AngularFireStub();
	const DialogRefStub = MockGroup.DialogRefStub();
	const ActivatedRouteStub = MockGroup.ActivatedRouteStub();
	const UserServiceStub = MockGroup.UserServiceStub();
	const RouteStub = MockGroup.RouteStub();

	

	beforeEach(() => {

		//service = new ChatService( {} );
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ { provide : ChatService, 		useValue : {} },
						 { provide: AngularFirestore, 	useValue : AngularFireStub },
						 { provide: AngularFireAuth, 	useValue : AngularFireAuth },
						 { provide: UserService, 		useValue : UserServiceStub } ]
		});
		service = TestBed.inject( ChatService );

	});

	

	it('should be initialized', () => {
		expect(service).toBeTruthy();
	});

	//it('The chat service should be created', () => {
	//	expect(service).toBeTruthy();
	//});



});
