


// Common Angular Items
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// Data Model
import { designSignoff } from '../../models/designSignoffs';



// RXJS Items
import { Observable } from 'rxjs';



// NGRX Items and NgRX Data
import { Store } from "@ngrx/store";
import { AuthState } from '../../store/reducers';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';



// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable()
export class designSignoffDataService extends DefaultDataService<designSignoff> {


	constructor(http						  : HttpClient,
              httpUrlGenerator 	: HttpUrlGenerator,
              public afs 				: AngularFirestore,
              private store			: Store<AuthState> ) {

		super('designSignoff', http, httpUrlGenerator);

	}




	// Create
	createDesignSignoff( userObj, designId, status, comments, pdfPath )
	{

		var userData = JSON.parse(localStorage.getItem('user'));

		let designSignoffObj = {
			'id' 			: '',
			'creatorId'		: userObj.uid,
			'creatorEmail'	: userObj.email,
			'designId' 		: designId, //deprecated
			'itemId' 			: designId, 
			'comments' 		: comments,
			'approve' 		: status,
			'deleted' 		: false,
			'pdfPath'			: pdfPath,
			'dateCreated'	: Date.now(),
		}

		var docRef = this.afs.collection('designSignoffs').add( designSignoffObj )
    	.then((docRef) => {

    		console.log('The item is ');
    		console.log(docRef);

			this.afs.collection('designSignoffs').doc(docRef.id).update({'id':docRef.id });
		});


	}


	// Read
	getAll(): Observable<designSignoff[]> {

		return <Observable<designSignoff[]>> this.afs.collection('designSignoffs', ref => ref
			.where('deleted', '==', false))
			.valueChanges()

	}



	getdesignSignoffsForDesign( designId:string ) : Observable<designSignoff[]>
	{
 		return <Observable<designSignoff[]>>this.afs.collection('designSignoffs', ref => ref
 			.where('designId', '==', designId )
 			.where('deleted', '==', false))
		.valueChanges()
	}

/*

	// Read all design signoffs for a design
	getSignoffsForDesign( designId ): Observable<designSignoff[]> {

		return <Observable<designSignoff[]>> this.afs.collection('designSignoffs', ref => ref
			.where('designId', '==', designId )
			.where('deleted', '==', false))
			.valueChanges()

	}





	// Read one designSignoff
	getdesignSignoffById( designSignoffId:string )
	{
		this.afs.collection('designSignoffs').doc( designSignoffId )
		.valueChanges()
		.subscribe((result) => {

			result['uid'] = designSignoffId;
			this.designSignoffOneStatus.next(result);

		});
	}
*/


	// Update
	updateDesignSignoff ( designSignoffObj )
	{
		this.afs.collection('designSignoffs').doc( designSignoffObj.uid ).update( designSignoffObj );
	}



	// Delete
	deleteDesignSignoff ( designSignoffId )
	{
		this.afs.collection('designSignoffs').doc( designSignoffId ).update( { 'deleted' : true } );
	}





}
