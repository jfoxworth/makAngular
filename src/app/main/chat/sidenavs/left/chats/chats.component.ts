import { Component, OnDestroy, OnInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

import { ChatService } from 'app/main/services/chat.service';

@Component({
	selector	 : 'chat-chats-sidenav',
	templateUrl  : './chats.component.html',
	styleUrls	: ['./chats.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations   : fuseAnimations
})
export class ChatChatsSidenavComponent implements OnInit, OnDestroy
{
	chats 			: any[];
	chatSearch 		: any;
	contacts 		: any[];
	searchText 		: string;
	user 			: any;
	conversations	: any[];
	messages		: any[];
	userData 		: any;

	// Private
	private _unsubscribeAll: Subject<any>;

	/**
	 * Constructor
	 *
	 * @param {ChatService} _chatService
	 */
	constructor(
		private _chatService: ChatService,
	)
	{
		// Set the defaults
		this.chatSearch = {
			name: ''
		};
		this.searchText = '';

		// Set the private defaults
		this._unsubscribeAll = new Subject();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------



	/**
	 * On init
	 */
	ngOnInit(): void
	{

    	// Grab the user data
        this.userData = JSON.parse(localStorage.getItem('user'));

        // Subscribe to the conversations
        this._chatService.conversationStatus
            .subscribe((conv)=>{this.conversations = conv;});

	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void
	{
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------



	/**
	 * chat selected
	 *
	 * @param index
	 */
	chatSelected( index ): void
	{
		this._chatService.chatSelected( index );
	}


	/**
	 * create conversation
	 *
	 * @param userId
	 */
	createConversation( userId:string ): void
	{
		this._chatService.createConversation( userId );
	}


}
