

/*
*
*
*		This is the service for the Designs. It handles the CRUD for
*		the designs
*
*
*/

// Standard Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


// RXJS Stuff
import { BehaviorSubject, Observable } from 'rxjs';


// Models
import { makDesign } from 'app/main/models/makDesign';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { makDesignEntityService } from 'app/main/services/entity/makDesign-entity.service';
import { makDesignDataService } from 'app/main/services/entity/makDesign-data.service';


@Injectable({providedIn: 'root'})
export class DesignsService
{


	designStatus 		: BehaviorSubject<any>;
	designAllStatus 	: BehaviorSubject<any>;
	designUserStatus 	: BehaviorSubject<any>;


	/*
	 *
	 * Constructor
	 *
	 *
	 */
	constructor(
		public afs 						: AngularFirestore,
		private makDesignEntityService	: makDesignEntityService,
		private makDesignDataService	: makDesignDataService
	)
	{
		this.designStatus 		= new BehaviorSubject([]);
		this.designAllStatus 	= new BehaviorSubject([]);
		this.designUserStatus 	= new BehaviorSubject([]);
	}







	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR DESIGNS
	//
	// -----------------------------------------------------------------------------------------------------


	// Create
	createDesign( )
	{
		this.makDesignDataService.createDesign( )
	}


	// Read one design
	getDesignById( designId:string )
	{ 
		console.log('The design ID is ');
		console.log(designId);
		this.afs.collection('designs').doc( designId )
		.valueChanges()
		.subscribe((result) => {

			console.log('The result is ');
			console.log(result);

			//result['uid'] = designId;
			this.designStatus.next(result);
			
		});
	}

	// Read all designs
	getValidDesigns( )
	{ 
 		this.afs.collection('designs', ref => ref
 			.where('status', '==', 1 )
 			.where('deleted', '==', false))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			console.log('The designs in the service are ');
			console.log(result);
			this.designAllStatus.next(result);

		});
	}

	// Read all designs for a user
	getDesignsForUser( userId )
	{ 
		console.log('The user ID is '+userId);
 		this.afs.collection('designs', ref => ref
 			.where('creatorId', '==', userId )
 			.where('deleted', '==', false))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			console.log('The designs in the service are ');
			console.log(result);
			this.designUserStatus.next(result);

		});
	}


	fetchDesignData( designId ) 
	{
		return this.afs.collection('designs', ref => ref.where('id', '==', designId ))
		.get();

	}


	// Update a design
	updateDesign( designObj )
	{
		//this.afs.collection('designs').doc( designObj.uid ).update( designObj );		

		this.makDesignDataService.updateDesign( designObj )
	}

	// Delete
	deleteDesign ( designId )
	{
		this.makDesignDataService.deleteDesign( designId )
		//this.afs.collection('designs').doc( designId ).update( { 'deleted' : true } );		
	}


}