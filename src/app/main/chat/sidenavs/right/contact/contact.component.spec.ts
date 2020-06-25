import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatContactSidenavComponent } from './contact.component';
import { mockItems } from 'app/main/services/mockItems';
import { ChatService } from 'app/main/services/chat.service';


describe('ChatContactSidenavComponent', () => {
	let component: ChatContactSidenavComponent;
	let fixture: ComponentFixture<ChatContactSidenavComponent>;

	let MockGroup = new mockItems();
	const ChatServiceStub = MockGroup.mockChatService();



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChatContactSidenavComponent ]
		})
		.compileComponents();
	}));







	beforeEach(() => {
	
	    TestBed.configureTestingModule({
	      declarations: [ ChatContactSidenavComponent ],
	      providers: [ { provide: ChatService, useValue : ChatServiceStub } ]
	    });


		fixture = TestBed.createComponent(ChatContactSidenavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});





	it('should create', () => {
		expect(component).toBeTruthy();
	});




});
