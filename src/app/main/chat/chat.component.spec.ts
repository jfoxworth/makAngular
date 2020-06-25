import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { fuseAnimations } from '@fuse/animations';
import { ChatService } from 'app/main/services/chat.service';
import { mockItems } from 'app/main/services/mockItems';



describe('ChatComponent', () => {
	let component: ChatComponent;
	let fixture: ComponentFixture<ChatComponent>;

	let MockGroup = new mockItems();
	const ChatServiceStub = MockGroup.mockChatService();

	

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChatComponent ]
		})
		.compileComponents();
	}));

	


	beforeEach(() => {


		TestBed.configureTestingModule({
			declarations: [ ChatComponent ],
			providers: [ { provide: ChatService, useValue : ChatServiceStub } ]
		});


		fixture = TestBed.createComponent(ChatComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	



	it('should create', () => {
		expect(component).toBeTruthy();
	});




});
