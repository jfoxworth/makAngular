import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatMenuModule } from '@angular/material/menu';

import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';



@Component({
    selector     : 'chat-view',
    templateUrl  : './chat-view.component.html',
    styleUrls    : ['./chat-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit
{
    user 			: any;
    chat 			: any;
    dialog 			: any;
    contact 		: any;
    contacts 		: any[] = [];
    replyInput 		: any;
    selectedChat 	: number = 0;
	  conversations	: any[];
	  dataFlag		: boolean = false;
	  userData		: any;


    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     */
    constructor(
        private _chatService: ChatService,
        private UserService: UserService
    )
    {
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


        // Subscribe to the cconversation index
        this._chatService.selectedChatIndex
            .subscribe((convNum)=>{
            	this.selectedChat = convNum;
            });


        // Subscribe to the data flag
        this._chatService.dataFlagStatus
            .subscribe((flagStatus)=>{this.dataFlag = flagStatus;});


        // Subscribe to the conversations
        this._chatService.conversationStatus
            .subscribe((conv)=>{
            	this.conversations = conv;
            });


        // Subscribe to the contacts
        this._chatService.contactStatus
            .subscribe((cont)=>{
            	this.contacts = cont;
            });



    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
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
     * Decide whether to show or not the contact's avatar in the message row
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    setContactImages()
    {
    	for (var a=0; a<this.contacts.length; a++)
    	{
    		for (var b=0; b<this.conversations[this.selectedChat]['messages'].length; b++)
	    	{
	    		if ( this.contacts[a]['uid'] == this.conversations[this.selectedChat]['messages'][b]['sender'] )
	    		{
	    			this.contacts[a]['displayMe'] = true;
	    		}
	    	}

    	}

    	for (var a=0; a<this.contacts.length; a++)
    	{
	        if ( this.contacts[a].profileImage === undefined )
	        {
	        	this.contacts[a].profileImage = this.UserService.getProfileImage( this.contacts[a] );
	        }
	    }


    }

    /**
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isFirstMessageOfGroup(message, i): boolean
    {
        return (i === 0 || this.conversations[this.selectedChat]['messages'][i - 1] && this.conversations[this.selectedChat]['messages'][i - 1].who !== message.who);
    }

    /**
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isLastMessageOfGroup(message, i): boolean
    {
        return (i === this.conversations[this.selectedChat]['messages'].length - 1 || this.conversations[this.selectedChat]['messages'][i + 1] && this.conversations[this.selectedChat]['messages'][i + 1].who !== message.who);
    }

    /**
     * Select contact
     */
    selectContact(): void
    {
        //this._chatService.selectContact(this.contact);
    }

    /**
     * Ready to reply
     */
    readyToReply(): void
    {
        setTimeout(() => {
            this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    /**
     * Focus to the reply input
     */
    focusReplyInput(): void
    {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    /**
     * Scroll to the bottom
     *
     * @param {number} speed
     */
    scrollToBottom(speed?: number): void
    {
    }

    /**
     * Reply
     */
    reply(event): void
    {
        event.preventDefault();

        if ( !this.replyForm.form.value.message )
        {
            return;
        }

        // Message
        const message = {
            sender 			: this.userData.uid,
            text 			: this.replyForm.form.value.message,
            sendDate		: Date.now(),
            readDate 		: [],
            status 			: 0,
            conversationId 	: this.conversations[this.selectedChat]['conversationId']
        };

        // Add the message to the chat
        this.conversations[this.selectedChat]['messages'].push(message);

        // Update the server
        this._chatService.pushMessage(message)
        	.then(response => {
            	this.readyToReply();
        });

        // Reset the reply form
        this.replyForm.reset();

    }
}
