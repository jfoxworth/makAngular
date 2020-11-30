

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
import { designSignoffDataService } from 'app/main/services/entity/designSignoff-data.service';



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
		public afs 							: AngularFirestore,
		private designSignoffDataService	: designSignoffDataService
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
	createDesignSignoff( userObj, designId, status, comments )
	{
		this.designSignoffDataService.createDesignSignoff( userObj, designId, status, comments );
	}




	getdesignSignoffsForDesign( designId:string )
	{ 
		this.designSignoffDataService.getdesignSignoffsForDesign( designId );
	}
/*
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
*/


	// Update
	updatedesignSignoff ( designSignoffObj )
	{
		this.designSignoffDataService.updateDesignSignoff( designSignoffObj );
		//this.afs.collection('designSignoffs').doc( designSignoffObj.uid ).update( designSignoffObj );		
	}



	// Delete
	deletedesignSignoff ( designSignoffId )
	{
		this.designSignoffDataService.deleteDesignSignoff( designSignoffId );
//		this.afs.collection('designSignoffs').doc( designSignoffId ).update( { 'deleted' : true } );		
	}








}