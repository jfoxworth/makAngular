

/*
*
*
*		This is the service for designSignoffs.
*
*/

// Standard Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


// RXJS Stuff
import { BehaviorSubject, Observable } from 'rxjs';


// Models
import { designSignoff } from 'app/main/models/designSignoffs';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({providedIn: 'root'})
export class DesignSignoffsService
{


	designSignoffStatus 	: BehaviorSubject<any>;
	designSignoffOneStatus 	: BehaviorSubject<any>;


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
		this.designSignoffStatus 		= new BehaviorSubject([]);
		this.designSignoffOneStatus 	= new BehaviorSubject([]);
	}




	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR VERSIONS
	//
	// -----------------------------------------------------------------------------------------------------




	// Create
	createDesignSignoff( userObj, design, project, version )
	{

		var userData = JSON.parse(localStorage.getItem('user'));

		let designSignoffObj = {
			'id' 			: '',
			'creatorId'		: userObj.uid,
			'creatorEmail'	: userObj.email,
			'designId' 		: design.id,
			'projectId'		: project.id,
			'versionId'		: version.id,
			'version'		: version,
			'comments' 		: '',
			'approve' 		: false,
			'deleted' 		: false,
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
	getdesignSignoffsForDesign( designId:string )
	{ 
 		this.afs.collection('designSignoffs', ref => ref
 			.where('designId', '==', designId )
 			.where('deleted', '==', false))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			console.log('The designSignoffs in the service are ');
			console.log(result);
			this.designSignoffStatus.next(result);

		});
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



	// Update
	updatedesignSignoff ( designSignoffObj )
	{
		this.afs.collection('designSignoffs').doc( designSignoffObj.uid ).update( designSignoffObj );		
	}



	// Delete
	deletedesignSignoff ( designSignoffId )
	{
		this.afs.collection('designSignoffs').doc( designSignoffId ).update( { 'deleted' : true } );		
	}








}