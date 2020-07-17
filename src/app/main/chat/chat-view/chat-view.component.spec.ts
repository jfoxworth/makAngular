import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ChatService } from 'app/main/services/chat.service';
import { ChatViewComponent } from './chat-view.component';

import { mockItems } from 'app/main/services/mockItems';


import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';


describe('ChatViewComponent', () => {
	let component: ChatViewComponent;
	let fixture: ComponentFixture<ChatViewComponent>;

	let MockGroup = new mockItems();
	const ChatServiceStub = MockGroup.mockChatService();






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
			providers: [ { provide: ChatService, useValue : ChatServiceStub } ]
		});


		fixture = TestBed.createComponent(ChatViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});




	it('should create', () => {
		expect(component).toBeTruthy();
	});



});
