


// Common Angular Items
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// Data Model
import { makDesign } from 'app/main/models/makDesign';



// RXJS Items
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



// NgRx Items
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';



// Firestore services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable()
export class makDesignDataService extends DefaultDataService<makDesign> {


    constructor(http			:	HttpClient, 
    			httpUrlGenerator: HttpUrlGenerator,
    			public afs 		: AngularFirestore,) {

        super('makDesign', http, httpUrlGenerator);
    	console.log('I am in the constructor function');

    }

    getAll(): Observable<any[]> {
    	console.log('I am in the get all function');
        //return this.http.get('/api/makDesigns')

		// Read all designs
 		return this.afs.collection('designs', ref => ref
 			.where('status', '==', 1 )
 			.where('deleted', '==', false))
			.valueChanges();

    }

}
