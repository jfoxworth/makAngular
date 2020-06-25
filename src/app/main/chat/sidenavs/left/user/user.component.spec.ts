import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatUserSidenavComponent } from './user.component';
import { ChatService } from 'app/main/services/chat.service';
import { mockItems } from 'app/main/services/mockItems';



describe('ChatUserSidenavComponent', () => {
	let component: ChatUserSidenavComponent;
	let fixture: ComponentFixture<ChatUserSidenavComponent>;

	let MockGroup = new mockItems();
	const ChatServiceStub = MockGroup.mockChatService();

	


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChatUserSidenavComponent ]
		})
		.compileComponents();
	}));

	



	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ ChatUserSidenavComponent ],
			providers: [ { provide: ChatService, useValue : ChatServiceStub } ]
		});



		fixture = TestBed.createComponent(ChatUserSidenavComponent);
		component = fixture.componentInstance;

		component.user = {};
		fixture.detectChanges();
	});

	



	it('should create', () => {
		expect(component).toBeTruthy();
	});



});
