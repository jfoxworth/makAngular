


// Common Angular Items
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// Data Model
import { makAnnouncement } from '../../models/makAnnouncement';
import { UserData } from '../../models/userData';



// RXJS Items
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';



// NGRX Items and NgRX Data
import { Store } from "@ngrx/store";
import { AuthState } from '../../store/reducers';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';



// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MarketplaceService } from '../marketplace.service';


import { environment } from '../../../../environments/environment';



@Injectable()
export class makAnnouncementDataService extends DefaultDataService<makAnnouncement> {


	constructor(http						: HttpClient,
				httpUrlGenerator 			: HttpUrlGenerator,
				public afs 					: AngularFirestore,
				private store				: Store<AuthState> ) {

		super('makAnnouncement', http, httpUrlGenerator);

	}




	// Create
	createAnnouncement( )
	{


		let announcementObj : makAnnouncement={
			'id'				  : '',
			'title'			  : 'Design Title',
			'dateCreated'	: Date.now(),
			'deployDate'	: Date.now(),
			'endDate'	    : Date.now(),
      'text'        : '',
			'image'       : {'path':'', 'download':'' },
			'deleted'			: false
		};
	
		var docRef = this.afs.collection('announcements').add( announcementObj )
		.then((docRef) => {

			this.afs.collection('announcements').doc(docRef.id).update({'id':docRef.id });
		});


	}





	// Read
	getAll(): Observable<makAnnouncement[]> {

		console.log('I am in the get all function');
		return <Observable<makAnnouncement[]>> this.afs.collection('announcements', ref => ref
			.where('deleted', '==', false))
			.valueChanges()

	}


	// Read
	getAnnouncementById( announcementId : string ):Observable<makAnnouncement>
	{
		return <Observable<makAnnouncement>> this.afs.collection('announcements').doc( announcementId )
			.valueChanges()

	}



	// Update
	updateAnnouncement( updateItem : makAnnouncement ):Promise<void>
	{
		return this.afs.collection('announcements').doc( updateItem.id ).update( updateItem );
	}


	// Delete
	deleteAnnouncement( announcementId : string ):Promise<void>
	{
		return this.afs.collection('announcements').doc( announcementId ).update( { 'deleted' : true } );
	}




}
