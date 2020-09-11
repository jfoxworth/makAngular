

/*
*
*
*		This is the service for the projects and handles the CRUD for projects
*
*
*/

// Standard Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';


// RXJS Stuff
import { BehaviorSubject, Observable } from 'rxjs';


// Models
import { makProject } from 'app/main/models/makProject';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { VersionsService } from 'app/main/services/versions.service';




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
		public afs 					: AngularFirestore,
		private VersionsService 	: VersionsService
	)
	{
		this.projectStatus 		= new BehaviorSubject([]);
		this.projectOneStatus 	= new BehaviorSubject([]);
		this.projectUDStatus 	= new BehaviorSubject([]);
	}







	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR PROJECTS
	//
	// -----------------------------------------------------------------------------------------------------


	// Create
	createProject( projObj, desObj )
	{

		var userData = JSON.parse(localStorage.getItem('user'));


		let project = {
			'id'			: '',
			'creatorId' 	: userData.uid,
			'creatorName' 	: userData.userName,
			'dateCreated'	: Date.now(),
			'description'	: "This is the description of this project",
			'designId' 		: desObj.uid,
			'designType'	: desObj.category,
			'initialOpen'	: false,
			'name'			: 'My Project',
			'status'		: '0',
			'versions'		: '1',
			'deleted'		: false,
		}

		var docRef = this.afs.collection('projects').add( project )
    	.then((docRef) => {

			this.afs.collection('designs').doc(docRef.id).update({'id':docRef.id });
			this.VersionsService.createVersion( 'default', projObj, [], desObj );
		});


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
	updateProject ( projectObj )
	{
		this.afs.collection('projects').doc( projectObj.uid ).update( projectObj );		
	}

	// Delete
	deleteProject ( projectId )
	{
		this.afs.collection('projects').doc( projectId ).update( { 'deleted' : true } );		
	}










}