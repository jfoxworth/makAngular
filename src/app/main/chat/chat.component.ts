import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ChatService } from 'app/main/services/chat.service';


@Component({
	selector	 : 'message',
	templateUrl  : './chat.component.html',
	styleUrls	: ['./chat.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations   : fuseAnimations
})
export class ChatComponent implements OnInit, OnDestroy
{
	selectedChat: number;
	chats:any;
	conversations:any;

   // Private
    private _unsubscribeAll: Subject<any>;

	/**
	 * Constructor
	 *
	 * @param {ChatService} ChatService
	 */
	constructor(
		private ChatService: ChatService
	)
	{
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void
	{
        this.ChatService.selectedChatIndex
            .subscribe((convNum)=>{this.selectedChat = convNum;});
	}


	/**
	 * On destroy
	 */
	ngOnDestroy(): void
	{
	}







}
