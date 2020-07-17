import { ChatStartComponent } from 'app/main/chat/chat-start/chat-start.component';
import { ChatLeftSidenavComponent } from 'app/main/chat/sidenavs/left/left.component';
import { ChatRightSidenavComponent } from 'app/main/chat/sidenavs/right/right.component';
import { ChatContactSidenavComponent } from 'app/main/chat/sidenavs/right/contact/contact.component';
import { ChatChatsSidenavComponent } from 'app/main/chat/sidenavs/left/chats/chats.component';
import { ChatComponent } from './chat.component';
import { ChatService } from 'app/main/services/chat.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { fuseAnimations } from '@fuse/animations';
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
			imports: [ MatSidenavModule,
					   BrowserAnimationsModule,
					   MatIconModule ],
			declarations: [ ChatComponent,
							ChatStartComponent,
							ChatRightSidenavComponent,
							ChatLeftSidenavComponent,
							ChatContactSidenavComponent,
							ChatChatsSidenavComponent ],
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
