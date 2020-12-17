

/*
*
*
*		This is the service for the projects and handles the CRUD for projects
*
*
*/

// Standard Angular Items
import { Injectable } from '@angular/core';

// RXJS Stuff
import { BehaviorSubject} from 'rxjs';

// Services
import { AngularFirestore } from '@angular/fire/firestore';
import { makProjectDataService } from '../services/entity/makProject-data.service';
import { makProject } from '../models/makProject';




@Injectable({providedIn: 'root'})
export class ProjectsService
{

	projectStatus 		: BehaviorSubject<any>;
	projectOneStatus 	: BehaviorSubject<any>;
	projectUDStatus 	: BehaviorSubject<any>;


	/*
	 *
	 * Constructor
	 *
	 *
	 */
	constructor(
		public afs 						: AngularFirestore,
		private makProjectDataService 	: makProjectDataService,
	)
	{
		this.projectStatus 		= new BehaviorSubject([]);
		this.projectOneStatus 	= new BehaviorSubject([]);
		this.projectUDStatus 	= new BehaviorSubject([]);
	}





  	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO SIMPLY RETURN DATA TO THE COMPONENT
	//
	// -----------------------------------------------------------------------------------------------------

	/**
	*  Return the product stages
	**/
	getProductStages() :string[] {
		return ['Design', 'Deposit', 'Approval', 'Fabrication', 'Balance', 'Delivery', 'Feedback']
	}




	/**
	*  Return initial product settings
	**/
	getInitialStageStatus() :boolean[] {
		return [true, false, false, false, false, false, false]
	}



	/**
	*  Return initial selected status
	**/
	getInitialSelectedStatus() :boolean[] {
		return [true, false, false, false, false, false, false]
	}



	/**
	*  Return initial selected status
	**/
	getStageTexts() :object[] {
		return [ { 'done' : 'While in the design phase, you can create as many versions as desired. Once you are happy with a version, you can look at a quote and then submit that version for purchase. When that is complete, a deposit can be made. After the deposit, Mak Studio will contact you for approval.',
					'notdone' : 'NA'},
				 { 'done' : 'Your deposit has been received.',
				   'notdone' : 'Once you are happy with a design version, you can look at the quote from either this page or the design studio. From there, you can make a deposit to move forward.'  } ]
	}




	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR PROJECTS
	//
	// -----------------------------------------------------------------------------------------------------


	// Create
	createProject( designObj, versionObj )
	{
		this.makProjectDataService.createProject( designObj, versionObj )
	}



	// Read projects for user
	getProjectsForUser( userId:string )
	{
 		this.afs.collection('projects', ref => ref
 			.where('creatorId', '==', userId )
 			.where('deleted', '==', false)
 			.orderBy("dateCreated", "desc"))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			console.log('The projects in the service are ');
			console.log(result);
			this.projectStatus.next(result);

		});
	}


	// Read one project
	getProjectById( projectId:string )
	{
		this.afs.collection('projects').doc( projectId )
		.valueChanges()
		.subscribe((result) => {

			result['uid'] = projectId;
			this.projectOneStatus.next(result);

		});
	}



	// Read projects from design for user
	getProjectsForUserDesign( userId:string, designId:string )
	{
 		this.afs.collection('projects', ref => ref
 			.where('creatorId', '==', userId )
 			.where('designId', '==', designId )
 			.where('deleted', '==', false)
 			.orderBy("dateCreated", "desc"))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			console.log('The projects in the service are ');
			console.log(result);
			this.projectUDStatus.next(result);

		});
	}


	// Update
	updateProject ( projectObj:makProject )
	{
    console.log(projectObj)
		this.makProjectDataService.updateProject( projectObj )
	}

	// Delete
	deleteProject ( projectId:string )
	{
		this.makProjectDataService.deleteProject( projectId )
	}










}
