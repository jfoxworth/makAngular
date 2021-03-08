

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

// RXJS Stuff
import { BehaviorSubject } from 'rxjs';


// Services
import { AngularFirestore } from '@angular/fire/firestore';
import { makDesignDataService } from '../services/entity/makDesign-data.service';
import { makDesign } from '../models/makDesign';


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
                public afs 						        : AngularFirestore,
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
	getDesignsForUser( userId:string )
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
	updateDesign( tD:makDesign )
	{
		console.log('I am in the update design with ... ');
		console.log(tD);
/*
		for (var a=1; a<tD['parameterMenus'].length; a++)
		{
			for (var b=0; b<tD['parameterMenus'][a]['parameters'].length; b++)
			{
				for (var c=0; c<tD['parameterMenus'][a]['parameters'][b]['images'].length; c++)
				{
					tD['parameterMenus'][a]['parameters'][b]['images'][c]['imageUrl'] = '';
				}
			}
		}
		*/

		this.makDesignDataService.updateDesign( tD ).then(mine=>console.log(mine))
	}

	// Delete
	deleteDesign ( designId:string )
	{
		this.makDesignDataService.deleteDesign( designId );
	}



}
