import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { ChatService } from 'app/main/services/chat.service';
import { ChatViewComponent } from './chat-view.component';
import { mockItems } from 'app/main/services/mockItems';

import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
			declarations: [ ChatViewComponent ],
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
