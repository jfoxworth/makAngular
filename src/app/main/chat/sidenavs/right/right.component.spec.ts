import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRightSidenavComponent } from './right.component';
import { ChatService } from 'app/main/services/chat.service';

import { mockItems } from 'app/main/services/mockItems';


describe('ChatRightSidenavComponent', () => {
	let component: ChatRightSidenavComponent;
	let fixture: ComponentFixture<ChatRightSidenavComponent>;


	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const mockChatService = MockGroup.mockChatService();



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChatRightSidenavComponent ]
		})
		.compileComponents();
	}));





	beforeEach(() => {



		TestBed.configureTestingModule({
			declarations: [ ChatRightSidenavComponent ],
			providers: [ { provide: ChatService, useValue : mockChatService } ]
		});



		fixture = TestBed.createComponent(ChatRightSidenavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});





	it('should create', () => {
		expect(component).toBeTruthy();
	});




});
