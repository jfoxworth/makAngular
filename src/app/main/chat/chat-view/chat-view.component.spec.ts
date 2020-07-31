import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatViewComponent } from './chat-view.component';

import { mockItems } from 'app/main/services/mockItems';


import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';



// Services
import { ChatService } from 'app/main/services/chat.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from 'app/main/services/user-service.service';



describe('ChatViewComponent', () => {
	let component: ChatViewComponent;
	let fixture: ComponentFixture<ChatViewComponent>;

	let MockGroup = new mockItems();
	const ChatServiceStub = MockGroup.mockChatService();
	const UserServiceStub = MockGroup.UserServiceStub();





	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChatViewComponent ]
		})
		.compileComponents();
	}));





	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [ MatMenuModule,
					   MatIconModule,
					   MatToolbarModule,
					   MatFormFieldModule,
					   MatInputModule,
					   BrowserAnimationsModule ],
			declarations: [ NgForm ],
			providers: [ { provide: ChatService, useValue : ChatServiceStub },
						 { provide: UserService, useValue : UserServiceStub } ]
		});


		fixture = TestBed.createComponent(ChatViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});




	it('should create', () => {
		expect(component).toBeTruthy();
	});



});
