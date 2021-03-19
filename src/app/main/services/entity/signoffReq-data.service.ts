


// Common Angular Items
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// Data Model
import { signoffReq } from '../../models/signoffReq';
import { UserData } from '../../models/userData';



// RXJS Items
import { Observable, pipe, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


// NGRX Items and NgRX Data
import { Store } from "@ngrx/store";
import { AuthState } from '../../store/reducers';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';



// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { VersionsService } from '../../services/versions.service';


import { environment } from '../../../../environments/environment';
import { isNgTemplate } from '@angular/compiler';



@Injectable()
export class signoffReqDataService extends DefaultDataService<signoffReq> {


	constructor(http						: HttpClient,
				httpUrlGenerator 			: HttpUrlGenerator,
				private VersionsService		: VersionsService,
				public afs 					: AngularFirestore ) {

		super('signoffReq', http, httpUrlGenerator);

	}


	// Create
	createSignoffReq( userObj, item, type:string )
	{

		var userData = JSON.parse(localStorage.getItem('UserData'));

		let signoffReqObj = {
			'id'						: '',
			'dateCreated'		: Date.now(),
			'creatorId'			: userData.uid,
			'creatorEmail'	: userData.email,
			'designId'		 	: item.id,				// deprecated
			'itemId'				: item.id,
			'signoffType'		: type,
			'userId'		 		: userObj.uid,
			'userEmail'			: userObj.email,
			'deleted'		 		: false
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
			let queryOne = this.afs.collection('signoffReqs', ref => ref
			.where('creatorId', '==', userData.uid )
			.where('deleted', '==', false))
			.valueChanges();
			
			let queryTwo = this.afs.collection('signoffReqs', ref => ref
			.where('userId', '==', userData.uid )
			.where('deleted', '==', false))
			.valueChanges();

			return <Observable<signoffReq[]>> combineLatest(queryOne,queryTwo).pipe(
        map(([one, two]) => [...one, ...two])
    	)
			/*
			return <Observable<signoffReq[]>> this.afs.collection('signoffReqs', ref => ref
				.where('userId', '==', userData.uid )
				.where('deleted', '==', false))
				.valueChanges()
				*/

		}else
		{
			return <Observable<signoffReq[]>> this.afs.collection('signoffReqs', ref => ref
				.where('userId', '==', '0' )
				.where('deleted', '==', false))
				.valueChanges()
		}

	}


	// Get signoffs for design or project
	getSignoffsForItem( itemId:string  ): Observable<signoffReq[]> {

		return <Observable<signoffReq[]>> this.afs.collection('signoffReqs', ref => ref
			.where('itemId', '==', itemId )
			.where('deleted', '==', false))
			.valueChanges()

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


