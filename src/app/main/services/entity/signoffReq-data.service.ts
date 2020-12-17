


// Common Angular Items
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// Data Model
import { signoffReq } from '../../models/signoffReq';
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
import { VersionsService } from '../../services/versions.service';


import { environment } from '../../../../environments/environment';



@Injectable()
export class signoffReqDataService extends DefaultDataService<signoffReq> {


	constructor(http						: HttpClient,
				httpUrlGenerator 			: HttpUrlGenerator,
				private VersionsService		: VersionsService,
				public afs 					: AngularFirestore ) {

		super('signoffReq', http, httpUrlGenerator);

	}


	// Create
	createSignoffReq( userObj, design )
	{

		var userData = JSON.parse(localStorage.getItem('UserData'));

		let signoffReqObj = {
			'id'				: '',
			'dateCreated'		: Date.now(),
			'creatorId'			: userData.id,
			'creatorEmail'		: userData.email,
			'designId'		 	: design.id,
			'userId'		 	: userObj.id,
			'userEmail'			: userObj.email,
			'deleted'		 	: false
		}

		var docRef = this.afs.collection('signoffReqs').add( signoffReqObj )
		.then((docRef) => {
			this.afs.collection('signoffReqs').doc(docRef.id).update({'id':docRef.id });
		});


	}



	// Read - all signoffs from user
	getAll(  ): Observable<signoffReq[]> {

		var userData = JSON.parse(localStorage.getItem('UserData'));
		if ( userData )
		{
			return <Observable<signoffReq[]>> this.afs.collection('signoffReqs', ref => ref
				.where('userId', '==', userData.uid )
				.where('deleted', '==', false))
				.valueChanges()

		}else
		{
			return <Observable<signoffReq[]>> this.afs.collection('signoffReqs', ref => ref
				.where('userId', '==', '0' )
				.where('deleted', '==', false))
				.valueChanges()
		}

	}



	// Update
	updateSignoffReq ( signoffReqObj )
	{
		this.afs.collection('signoffReqs').doc( signoffReqObj.uid ).update( signoffReqObj );
	}



	// Delete
	deleteSignoffReq ( signoffReqId )
	{
		this.afs.collection('signoffReqs').doc( signoffReqId ).update( { 'deleted' : true } );
	}





}


