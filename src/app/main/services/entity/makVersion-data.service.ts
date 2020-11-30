


// Common Angular Items
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// Data Model
import { makVersion } from 'app/main/models/makVersion';



// RXJS Items
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';


// NgRx Items
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';



// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MarketplaceService } from 'app/main/services/marketplace.service';


import { environment } from 'environments/environment';



@Injectable()
export class makVersionDataService extends DefaultDataService<makVersion> {


	constructor(http						: HttpClient, 
				httpUrlGenerator 			: HttpUrlGenerator,
				public afs 					: AngularFirestore,
				private MarketplaceService  : MarketplaceService ) {

		super('makVersion', http, httpUrlGenerator);

	}




	// Read - All versions from user
	createVersion( type, project, versions, design ) 
	{

		var userData = JSON.parse(localStorage.getItem('UserData'));

		let versionObj = {
			'id'			: '',
			'dateCreated'	: Date.now(),
			'creatorId'		: userData.uid,
			'creatorName'	: userData.displayName,
			'description'	: "This is the description of this version",
			'designId' 		: design.id,
			'initialOpen'	: false,
			'name'			: 'New Version',
			'price'			: 0,
			'projectId'		: project.id,
			'values'		: {},
			'version'		: versions.length+1,
			'deleted' 		: false,
			'measurements' 	: '',
			'tax'			: 0,
			'totalCost'		: 0,
			'deposit'		: 0
		}

		if ( type != 'default' )
		{
			versionObj['values'] = versions[versions.length-1]['values'];
		}

		var docRef = this.afs.collection('versions').add( versionObj )
		.then((docRef) => {

			this.afs.collection('versions').doc(docRef.id).update({'id':docRef.id });
		});

	}




	// Read - All versions from user
	getAll(): Observable<makVersion[]> {

		var userData = JSON.parse(localStorage.getItem('UserData'));


		return <Observable<makVersion[]>> this.afs.collection('versions', ref => ref
			.where('creatorId', '==', userData.uid )
			.where('deleted', '==', false))
			.valueChanges()
	}



	// Read one version
	getVersionById( versionId:string ): Observable<makVersion>
	{ 
		return <Observable<makVersion>> this.afs.collection('versions').doc( versionId )
		.valueChanges()
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




}
