

/*
*
*
*		This is the service for SignoffReqs.
*
*/

// Standard Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


// RXJS Stuff
import { BehaviorSubject, Observable } from 'rxjs';


// Models
import { signoffReq } from 'app/main/models/signoffReq';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({providedIn: 'root'})
export class SignoffReqsService
{


	signoffReqStatus 		: BehaviorSubject<any>;
	signoffReqOneStatus 	: BehaviorSubject<any>;
	signoffReqUserStatus 	: BehaviorSubject<any>;


	/*
	 *
	 * Constructor
	 *
	 *
	 */
	constructor(
		public afs 			: AngularFirestore,
	)
	{
		this.signoffReqStatus 		= new BehaviorSubject([]);
		this.signoffReqOneStatus 	= new BehaviorSubject([]);
		this.signoffReqUserStatus 	= new BehaviorSubject([]);
	}




	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR VERSIONS
	//
	// -----------------------------------------------------------------------------------------------------



	// Create
	createSignoffReq( userObj, design )
	{

		var userData = JSON.parse(localStorage.getItem('user'));

		let signoffReqObj = {
			'id' 			: '',
			'dateCreated'	: Date.now(),
			'creatorId'		: userData.uid,
			'creatorEmail'	: userData.email,
			'designId' 		: design.id,
			'userId' 		: userObj.uid,
			'userEmail'		: userObj.email,
			'deleted' 		: false
		}

		var docRef = this.afs.collection('signoffReqs').add( signoffReqObj )
    	.then((docRef) => {

    		console.log('The item is ');
    		console.log(docRef);

			this.afs.collection('signoffReqs').doc(docRef.id).update({'id':docRef.id });
		});


	}




	// Read
	getSignoffReqsForDesign( designId:string )
	{ 
 		this.afs.collection('signoffReqs', ref => ref
 			.where('designId', '==', designId )
 			.where('deleted', '==', false))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			console.log('The signoffReqs in the service are ');
			console.log(result);
			this.signoffReqStatus.next(result);

		});
	}



	// Read one signoffReq
	getSignoffReqById( signoffReqId:string )
	{ 
		this.afs.collection('signoffReqs').doc( signoffReqId )
		.valueChanges()
		.subscribe((result) => {

			result['uid'] = signoffReqId;
			this.signoffReqOneStatus.next(result);
			
		});
	}





	// Read
	getSignoffReqsForUser( userId:string )
	{ 
	 		this.afs.collection('signoffReqs', ref => ref
	 			.where('userId', '==', userId )
	 			.where('deleted', '==', false))
			.valueChanges({idField: 'uid'})
			.subscribe(result=> {

				console.log('The signoffReqs for the user in the service are ');
				console.log(result);
				this.signoffReqUserStatus.next(result);

			});
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