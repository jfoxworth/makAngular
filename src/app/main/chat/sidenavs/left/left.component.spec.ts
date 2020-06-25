import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatLeftSidenavComponent } from './left.component';
import { ChatService } from 'app/main/services/chat.service';
import { mockItems } from 'app/main/services/mockItems';



describe('ChatLeftSidenavComponent', () => {
	let component: ChatLeftSidenavComponent;
	let fixture: ComponentFixture<ChatLeftSidenavComponent>;


	let MockGroup = new mockItems();
	const ChatServiceStub = MockGroup.mockChatService();



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChatLeftSidenavComponent ]
		})
		.compileComponents();
	}));




	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ ChatLeftSidenavComponent ],
			providers: [ { provide: ChatService, useValue : ChatServiceStub } ]
		});

		fixture = TestBed.createComponent(ChatLeftSidenavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});





	it('should create', () => {
		expect(component).toBeTruthy();
	});





});
