
/*
	This is the service for the chats page.

*/


// Common angular items
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


// RXJS Items
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Fuse items
import { FuseUtils } from '@fuse/utils';


// Services
import { AuthService } from 'app/main/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'app/main/services/user-service.service';



@Injectable({
  providedIn: 'root',
})
export class ChatService
{
	contacts		: any[];
	chats			: any[];
	user 			: any;
	conversations 	: any[];
	messages		: any[];
	onChatSelected: BehaviorSubject<any>;
	onContactSelected: BehaviorSubject<any>;
	onChatsUpdated: Subject<any>;
	onUserUpdated: Subject<any>;
	onLeftSidenavViewChanged: Subject<any>;
	onRightSidenavViewChanged: Subject<any>;
	selectedChatIndex : BehaviorSubject<any>;
	dataFlagStatus : BehaviorSubject<any>;
	conversationStatus : BehaviorSubject<any>;
	contactStatus : BehaviorSubject<any>;
	userData : any;

	/**
	 * Constructor
	 *
	 * @param {HttpClient} _httpClient
	 */
	constructor(
		private _httpClient: HttpClient,
		public afs: AngularFirestore,
		public UserService:UserService
	)
	{
		// Set the defaults
		this.onChatSelected = new BehaviorSubject(null);
		this.onContactSelected = new BehaviorSubject(null);
		this.onChatsUpdated = new Subject();
		this.onUserUpdated = new Subject();
		this.onLeftSidenavViewChanged = new Subject();
		this.onRightSidenavViewChanged = new Subject();
		this.selectedChatIndex = new BehaviorSubject(0);
		this.dataFlagStatus = new BehaviorSubject(false);
		this.conversationStatus = new BehaviorSubject([]);
		this.contactStatus = new BehaviorSubject([]);
		this.contacts = [];


		console.log('In the service');
 		
		this.getConversations();
 		/*
 		this.getConversations()
			.subscribe(result => {
				this.conversations = result;
				console.log('The conversations in the service are ...');
				console.log(this.conversations);
			});

		*/
	}

	/**
	 * Resolver
	 *
	 * @param {ActivatedRouteSnapshot} route
	 * @param {RouterStateSnapshot} state
	 * @returns {Observable<any> | Promise<any> | any}
	 *
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
	{



 		this.getConversations()
			.subscribe(result => {
				this.conversations = result;
				console.log('The conversations in the service are ...');
				console.log(this.conversations);
			});
	}



	/**
	 * Get conversations
	 *
	 */
	getConversations( ) {

		// Grab the user data
		this.userData = JSON.parse(localStorage.getItem('user'));


		this.afs.collection('convParticipants', ref => ref.where('participantId', '==', this.userData.uid)).valueChanges()
			.subscribe(result => {
				this.conversations = result;
				console.log('The conversations are');
				console.log(this.conversations);
				for (var a=0; a<this.conversations.length; a++)
				{

					// Get the messages sent in this conversation
					this.getMessages( this.conversations[a]['conversationId'] )
						.subscribe( thisResult =>{
							if ( thisResult.length >0 )
							{

								for (var b=0; b<this.conversations.length; b++)
								{
									if ( this.conversations[b]['conversationId'] == thisResult[0]['conversationId'] )
									{
										this.conversations[b]['messages'] = thisResult;
									}
								}
								for (var b=0; b<this.conversations.length; b++)
								{
									if ( this.conversations[b]['messages'] === undefined )
									{
										this.conversations[b]['messages'] = [];	
									}
								}
								for (var b=0; b<thisResult.length; b++)
								{
									// Get the profiles for those in the conversation
									this.getContact( thisResult[b]['sender'] );
								}
							}
							this.conversationStatus.next(this.conversations);
							this.dataFlagStatus.next(true);
						});


				}
			});

	}




	/**
	 * Get the messages from that conversation
	 */
	getMessages( conversationId : string ):Observable<any> {

		// Get projects collection, create an id, and then set a new project 
		// with the data for this design
		console.log('In get messages');
		return this.afs.collection('messages', ref => ref.where('conversationId', '==', conversationId)).valueChanges();
	}



	/**
	 * Push a message for a conversation
	 */
	pushMessage( message ):Promise<any> {

		console.log('In push messages');
		return this.afs.collection('messages').add(message)
	}



	/**
	 * Get the contacts for the conversation
	 */
	getContact( userId ) {

		console.log('In get contacts');

		let existFlag = true;
		for (var a=0; a<this.contacts.length; a++)
		{
			if ( this.contacts[a]['uid'] == userId )
			{
				existFlag = false;
			}
		}

		if ( existFlag )
		{
			this.afs.collection('users').doc(userId).get()
				.subscribe(response=> {
					this.userData=response.data();
					this.contacts.push(this.userData);

					for (var a=0; a<this.contacts.length; a++)
					{
						for (var b=0; b<this.contacts.length; b++)
						{
							if ( ( this.contacts[a] !== undefined ) && ( this.contacts[b] !== undefined ) )
							{
								if ( ( this.contacts[a]['uid'] == this.contacts[b]['uid'] ) && ( a!==b ) )
								{
									this.contacts.splice(b);
								}
							}
						}
					}
					for (var a=0; a<this.contacts.length; a++)
					{
						if (this.contacts[a]!==undefined)
						{
							if ( this.contacts[a].profileImage === undefined)
							{
				        		this.contacts[a].profileImage = this.UserService.getProfileImage( this.contacts[a] );
							}
						}
					}
					this.contactStatus.next(this.contacts);
					console.log('The contacts are ');
					console.log(this.contacts);
				});	
		}


	}





	/**
	 * Create a new conversation
	 */
	createConversation( userId ) {

		console.log('In create conversation');
		this.afs.collection('conversations').add({'dateCreated' : Date.now()})
		.then(ref => {
			console.log("Document written with ID: ", ref.id);
			const convBlock1 = {
				'conversationId' : ref.id,
				'participantId'  : userId,
				'dateCreated'	: Date.now()
			}
			this.afs.collection('convParticipants').add(convBlock1);
			const convBlock2 = {
				'conversationId' : ref.id,
				'participantId'  : 'fTPPDmQeWmUZP2um5TXFpVFYMXi2',
				'dateCreated'	: Date.now()
			}
			this.afs.collection('convParticipants').add(convBlock2);
		});
	}




	/**
	 * Select conversation
	 *
	 * @param index
	 */
	chatSelected(index): void
	{
		console.log('in chat selected with '+index);
		this.selectedChatIndex.next(index);
	}




}
