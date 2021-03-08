

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
import { makVersion } from '../models/makVersion';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { makVersionDataService } from '../services/entity/makVersion-data.service';


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
		public afs 						: AngularFirestore,
		private makVersionDataService 	: makVersionDataService,
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
		this.makVersionDataService.createVersion( type, project, versions, design );
	}




	// Read
	getVersionsForProject( projectId:string )
	{
		console.log('The project ID is ...');
		console.log(projectId);
		console.log('The versions are ...');
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
		console.log(versionObj);
		this.makVersionDataService.updateVersion( versionObj );
	}



	// Delete
	deleteVersion ( versionId )
	{
		this.makVersionDataService.deleteVersion( versionId );
	}









	/*
	*
	*	Create a blank version
	*
	*/
	blankVersion( ) {

		var userData = JSON.parse(localStorage.getItem('user'));

		if ( !userData )
		{
			userData = { 'uid' : '', 'email': '' }
		}


		return {
			'id'			: '',
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
			'deleted' 		: false,
			'measurements' 	: '',
			'tax'			: 0,
			'totalCost'		: 0,
			'deposit'		: 0
		}

	}



}
