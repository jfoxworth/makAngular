import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ChatsService } from 'app/main/services/chats.service';

@Component({
	selector	 : 'message',
	templateUrl  : './chat.component.html',
	styleUrls	: ['./chat.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations   : fuseAnimations
})
export class ChatComponent implements OnInit, OnDestroy
{
	selectedChat: any;
	chats:any;
	conversations:any;

	/**
	 * Constructor
	 *
	 * @param {ChatService} _chatService
	 */
	constructor(
		private ChatsService: ChatsService
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
		  this.ChatsService.getConversations()
			  .subscribe(result => {

				var tempArray = [];
				var docData;
				result.forEach((doc) => {
					docData=doc.data();
					docData.uid=doc.id;
					//console.log(doc.id, '=>', doc.data());
					tempArray.push(docData);
				});
				this.conversations = tempArray;

				console.log('The conversations are ...');
				console.log(this.conversations);

				this.ChatsService.getMessages( this.conversations[0]['conversationId'] )
				  .subscribe(result => {

					var tempArray = [];
					var docData;
					result.forEach((doc) => {
						docData=doc.data();
						docData.uid=doc.id;
						//console.log(doc.id, '=>', doc.data());
						tempArray.push(docData);
					});
					this.conversations[0]['messages'] = tempArray;

					console.log('The messages are ...');
					console.log(tempArray);

				});

		});


	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void
	{
	}







}
