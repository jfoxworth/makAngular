/*

	This is the resolver for the projects. Right now, it simply 
	gets all of the projects for a user. In the future, an additonal
	level of functionality may be added to allow to select a 
	project based on ID.
	
*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



// Data Model
import { makProject } from 'app/main/models/makProject';
import { UserData } from 'app/main/models/userData';



// RXJS Items
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';



// NGRX Items and NgRX Data
import { Store } from "@ngrx/store";
import { AuthState } from 'app/main/reducers';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';



// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { VersionsService } from 'app/main/services/versions.service';


import { environment } from 'environments/environment';




@Injectable()
export class makProjectDataService extends DefaultDataService<makProject> {


	constructor(http							: HttpClient, 
				httpUrlGenerator 				: HttpUrlGenerator,
				public afs 						: AngularFirestore,
				public VersionsService  		: VersionsService
	)
	{

		super('makProject', http, httpUrlGenerator);

	}



	// Create
	createProject( designObj, versionObj )
	{

		console.log('In create project with ...');
		console.log(designObj);
		console.log(versionObj);

		var userData = JSON.parse(localStorage.getItem('UserData'));


		let project = {
			'id'			: '',
			'creatorId'	 	: userData.uid,
			'creatorName'	: userData.displayName,
			'dateCreated'	: Date.now(),
			'description'	: "This is the description of this project",
			'designId'		: designObj.uid,
			'designType'	: designObj.category,
			'initialOpen'	: false,
			'name'			: 'My Project',
			'status'		: '0',
			'versions'		: '1',
			'deleted'		: false,
		}

		var docRef = this.afs.collection('projects').add( project )
		.then((docRef) => {

			project.id = docRef.id;
			let tempArray = [];
			tempArray.push(versionObj);
			this.afs.collection('projects').doc(docRef.id).update({'id':docRef.id });
			this.VersionsService.createVersion( versionObj, project, tempArray, designObj );
		});


	}




	// Read - all projects for user
	getAll(): Observable<makProject[]> {

		if ( localStorage.getItem('UserData') )
		{
			console.log('Here 0');
			var userData = JSON.parse(localStorage.getItem('UserData'));
			return <Observable<makProject[]>> this.afs.collection('projects', ref => ref
			.where('creatorId', '==', userData.uid )
			.where('deleted', '==', false))
			.valueChanges()
		}else
		{
			console.log('Here 1');
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
