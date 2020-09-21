
/*
*
*
*		This is the service for the marketplace page. It handles
*		the items that format the page.
*
*
*/

// Standard Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


// RXJS Stuff
import { BehaviorSubject, Observable } from 'rxjs';


// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';




@Injectable({
	providedIn: 'root'
})
export class StoreService {




	/*
	 *
	 * Constructor
	 *
	 *
	 */
	constructor()
	{

	}


}
