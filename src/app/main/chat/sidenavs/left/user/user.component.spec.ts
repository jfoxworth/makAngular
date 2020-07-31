import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatUserSidenavComponent } from './user.component';
import { ChatService } from 'app/main/services/chat.service';
import { mockItems } from 'app/main/services/mockItems';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';




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
			imports: [ MatIconModule,
					   MatRadioModule,
					   MatToolbarModule,
					   MatFormFieldModule,
					   ReactiveFormsModule,
					   MatInputModule,
					   BrowserAnimationsModule ],
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
