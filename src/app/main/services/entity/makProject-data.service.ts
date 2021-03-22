


// Common Angular Items
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Data Model
import { makProject } from '../../models/makProject';

// RXJS Items
import { Observable } from 'rxjs';

// NGRX Items and NgRX Data
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { VersionsService } from '../../services/versions.service';
import { SignoffReqsService } from '../../services/signoff-reqs.service';


@Injectable()
export class makProjectDataService extends DefaultDataService<makProject> {


	constructor(  http							    		: HttpClient,
                httpUrlGenerator 					: HttpUrlGenerator,
                public afs 								: AngularFirestore,
                public VersionsService 		: VersionsService,
								public SignoffReqsService : SignoffReqsService
	)
	{

		super('makProject', http, httpUrlGenerator);

	}


	

	// Create
	createProject( designObj, versionObj )
	{

		var userData = JSON.parse(localStorage.getItem('UserData'));

		let project:makProject = {
			'id'					: '',
			'creatorId'	 	: userData.uid,
			'creatorName'	: userData.displayName,
			'dateCreated'	: Date.now(),
			'description'	: "This is the description of this project",
			'designId'		: designObj.id,
			'designType'	: designObj.category,
			'initialOpen'	: false,
			'name'			  : 'My Project',
			'status'		  : 0,
			'versions'		: '1',
			'deleted'		  : false,
		}

		var docRef = this.afs.collection('projects').add( project )
		.then((docRef) => {

			project.id = docRef.id;
			let tempArray = [];
			tempArray.push(versionObj);
			this.afs.collection('projects').doc(docRef.id).update({'id':docRef.id });
			console.log('I have created a project for the design - '+designObj.title+' with an id of '+docRef.id);
			this.VersionsService.createVersion( versionObj, project, tempArray, designObj );
			this.SignoffReqsService.createSignoffReq(userData, project, 'project');
		});


	}




	// Read - all projects for user
	getAll(): Observable<makProject[]> {

		if ( localStorage.getItem('UserData') )
		{
			var userData = JSON.parse(localStorage.getItem('UserData'));
			return <Observable<makProject[]>> this.afs.collection('projects', ref => ref
			.where('creatorId', '==', userData.uid )
			.where('deleted', '==', false))
			.valueChanges()
		}else
		{
			return <Observable<makProject[]>> this.afs.collection('projects', ref => ref
			.where('creatorId', '==', '0' )
			.where('deleted', '==', false))
			.valueChanges()
		}


	}



	// Read
	getProjectById( projectId : string ):Observable<makProject>
	{
		return <Observable<makProject>> this.afs.collection('projects').doc( projectId )
			.valueChanges()

	}

	// Update
	updateProject ( projectObj:makProject )
	{
		this.afs.collection('projects').doc( projectObj.id ).update( projectObj );
	}

	// Delete
	deleteProject ( projectId:string )
	{
		this.afs.collection('projects').doc( projectId ).update( { 'deleted' : true } );
	}

}
