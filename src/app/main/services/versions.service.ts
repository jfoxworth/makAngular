

/*
*
*
*		This is the service for Versions.
*
*/

// Standard Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';


// RXJS Stuff
import { BehaviorSubject, Observable } from 'rxjs';


// Models
import { makVersion } from 'app/main/models/makVersion';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({providedIn: 'root'})
export class VersionsService
{


	versionStatus 		: BehaviorSubject<any>;
	versionOneStatus 	: BehaviorSubject<any>;


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
		this.versionStatus 		= new BehaviorSubject([]);
		this.versionOneStatus 	= new BehaviorSubject([]);
	}




	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR VERSIONS
	//
	// -----------------------------------------------------------------------------------------------------


	// Create
	createVersion( type, project, versions, design )
	{

		var userData = JSON.parse(localStorage.getItem('user'));

		let versionObj = {
			'dateCreated'	: Date.now(),
			'creatorId'		: userData.uid,
			'creatorName'	: userData.username,
			'description'	: "This is the description of this version",
			'designId' 		: design.id,
			'initialOpen'	: false,
			'name'			: 'New Version',
			'price'			: 0,
			'projectId'		: project.id,
			'values'		: {},
			'version'		: versions.length+1,
			'deleted' 		: false
		}

		if ( type != 'default' )
		{
			versionObj['values'] = versions[versions.length-1][type]['values'];
		}

		var docRef = this.afs.collection('versions').add( versionObj )
    	.then((docRef) => {

			this.afs.collection('versions').doc(docRef.id).update({'id':docRef.id });
		});


	}




	// Read
	getVersionsForProject( projectId:string )
	{ 
 		this.afs.collection('versions', ref => ref
 			.where('projectId', '==', projectId )
 			.where('deleted', '==', false)
 			.orderBy("version", "desc"))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			console.log('The versions in the service are ');
			console.log(result);
			this.versionStatus.next(result);

		});
	}



	// Read one version
	getVersionById( versionId:string )
	{ 
		this.afs.collection('versions').doc( versionId )
		.valueChanges()
		.subscribe((result) => {

			result['uid'] = versionId;
			this.versionOneStatus.next(result);
			
		});
	}



	// Update
	updateVersion ( versionObj )
	{
		this.afs.collection('versions').doc( versionObj.uid ).update( versionObj );		
	}



	// Delete
	deleteVersion ( versionId )
	{
		this.afs.collection('versions').doc( versionId ).update( { 'deleted' : true } );		
	}









	/*
	*
	*	Create a blank version
	*
	*/
	blankVersion( ) {

		var userData = JSON.parse(localStorage.getItem('user'));
		
		return {
			'dateCreated'	: Date.now(),
			'creatorId'		: userData.uid,
			'creatorName'	: userData.username,
			'description'	: "This is the description of this version",
			'designId' 		: '',
			'initialOpen'	: false,
			'name'			: 'New Version',
			'price'			: 0,
			'projectId'		: '',
			'values'		: {},
			'version'		: 1,
			'deleted' 		: false
		}

	}



}