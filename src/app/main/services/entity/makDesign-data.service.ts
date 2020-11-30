


// Common Angular Items
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// Data Model
import { makDesign } from 'app/main/models/makDesign';
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
import { MarketplaceService } from 'app/main/services/marketplace.service';


import { environment } from 'environments/environment';



@Injectable()
export class makDesignDataService extends DefaultDataService<makDesign> {


	constructor(http						: HttpClient, 
				httpUrlGenerator 			: HttpUrlGenerator,
				public afs 					: AngularFirestore,
				private store				: Store<AuthState>,
				private MarketplaceService  : MarketplaceService ) {

		super('makDesign', http, httpUrlGenerator);

	}




	// Create
	createDesign( )
	{

        var userData = JSON.parse(localStorage.getItem('UserData'));

		let designObj = {
			'id'				 : '',
			'title'			 : 'Design Title',
			'dateCreated'		: Date.now(),
			'creatorId'			: userData.uid,
			'creatorName'		: userData.displayName,
			'category'			: 'Wall',
			'company'			: '',
			'companyId'			: '',
			'initialPrice'		: 0,
			'description'		: '',
			'marketplace'		: {
									'images' : []	
			},
			'price'				: 0,
			'priceString'		 : '',
			'priceFormula'		: '',
			'priceArray'		: [],
			'priceShowForm'		: '',
			'priceStatus'		: false,
			'priceValid'		: false,
			'shapediverTicket'	: '',
			'status'			: 0,
			'parameterMenus'	: [],
			'signoffRequired'	: false,
			'deleted'			: false
		}

		var docRef = this.afs.collection('designs').add( designObj )
		.then((docRef) => {

			this.afs.collection('designs').doc(docRef.id).update({'id':docRef.id });
		});


	} 






	// Read
	getAll(): Observable<makDesign[]> {

		return <Observable<makDesign[]>> this.afs.collection('designs', ref => ref
			.where('deleted', '==', false))
			.valueChanges()

	}


	// Read
	getDesignById( designId : string ):Observable<makDesign>
	{
		return <Observable<makDesign>> this.afs.collection('designs').doc( designId )
			.valueChanges()
		
	} 



	// Update
	updateDesign( updateItem : makDesign ):Promise<void>
	{
		return this.afs.collection('designs').doc( updateItem.id ).update( updateItem );		
		
	} 


	// Delete
	deleteDesign( designId : string ):Promise<void>
	{
		return this.afs.collection('designs').doc( designId ).update( { 'deleted' : true } );		
	} 




}
