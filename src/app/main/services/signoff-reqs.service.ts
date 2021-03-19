

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
import { signoffReq } from '../models/signoffReq';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { signoffReqDataService } from '../services/entity/signoffReq-data.service';


@Injectable({providedIn: 'root'})
export class SignoffReqsService
{


	signoffReqStatus 			: BehaviorSubject<any>;
	signoffReqOneStatus 		: BehaviorSubject<any>;
	signoffReqUserStatus 		: BehaviorSubject<any>;
	signoffReqDesignUserStatus 	: BehaviorSubject<any>;


	/*
	 *
	 * Constructor
	 *
	 *
	 */
	constructor(
		public afs 						: AngularFirestore,
		private signoffReqDataService 	: signoffReqDataService,
	)
	{
		this.signoffReqStatus 				= new BehaviorSubject([]);
		this.signoffReqOneStatus 			= new BehaviorSubject([]);
		this.signoffReqUserStatus 			= new BehaviorSubject([]);
		this.signoffReqDesignUserStatus 	= new BehaviorSubject([]);
	}




	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR VERSIONS
	//
	// -----------------------------------------------------------------------------------------------------



	// Create
	createSignoffReq( userObj, design, type )
	{
		this.signoffReqDataService.createSignoffReq( userObj, design, type );
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





	// Read for user
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




	// Read for user and design
	getSignoffReqsForDesignUser( userId:string, designId:string )
	{
	 		this.afs.collection('signoffReqs', ref => ref
	 			.where('userId', '==', userId )
	 			.where('designId', '==', designId )
	 			.where('deleted', '==', false))
			.valueChanges({idField: 'uid'})
			.subscribe(result=> {

				console.log('The signoffReqs for the design and user in the service are ');
				console.log(result);
				this.signoffReqDesignUserStatus.next(result);

			});
	}




	// Update
	updateSignoffReq ( signoffReqObj )
	{
		this.signoffReqDataService.updateSignoffReq( signoffReqObj );
//		this.afs.collection('signoffReqs').doc( signoffReqObj.uid ).update( signoffReqObj );
	}



	// Delete
	deleteSignoffReq ( signoffReqId )
	{
		this.signoffReqDataService.deleteSignoffReq( signoffReqId );
//		this.afs.collection('signoffReqs').doc( signoffReqId ).update( { 'deleted' : true } );
	}








}
