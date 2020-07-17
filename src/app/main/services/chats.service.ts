import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// Services
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor( public afs: AngularFirestore ) { }


	/**
	 * Get the conversations that this use is involved in
	 */
	getConversations( ) {

		// Get projects collection, create an id, and then set a new project 
		// with the data for this design
		let userData = JSON.parse(localStorage.getItem('userData'));
		console.log('participantId of '+userData.uid);
		return this.afs.collection('convParticipants', ref => ref.where('participantId', '==', userData.uid)).get();
	}



	/**
	 * Get the conversations that this use is involved in
	 */
	getMessages( conversationId : string ) {

		// Get projects collection, create an id, and then set a new project 
		// with the data for this design
		let userData = JSON.parse(localStorage.getItem('userData'));
		return this.afs.collection('messages', ref => ref.where('conversationId', '==', conversationId)).get();
	}

}

