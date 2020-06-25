import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatChatsSidenavComponent } from './chats.component';
import { mockItems } from 'app/main/services/mockItems';
import { ChatService } from 'app/main/services/chat.service';



describe('ChatChatsSidenavComponent', () => {
	let component: ChatChatsSidenavComponent;
	let fixture: ComponentFixture<ChatChatsSidenavComponent>;

	let MockGroup = new mockItems();
	const ChatServiceStub = MockGroup.mockChatService();




	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChatChatsSidenavComponent ]
		})
		.compileComponents();
	}));





	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ ChatChatsSidenavComponent ],
			providers: [ { provide: ChatService, useValue : ChatServiceStub } ]
		});



		fixture = TestBed.createComponent(ChatChatsSidenavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});





	it('should create', () => {
		expect(component).toBeTruthy();
	});




});
