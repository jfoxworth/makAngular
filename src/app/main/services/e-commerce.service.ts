

/*
*
*
*		This is the service for the e-commerce or the project list 
*		set of functions. It handles the formatting of data for
*		the e-commerce page.
*
*
*/

// Standard Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';


// RXJS Stuff
import { BehaviorSubject, Observable } from 'rxjs';


// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({providedIn: 'root'})
export class EcommerceService
{
	projectStatus 	: BehaviorSubject<any>;
	versionStatus 	: BehaviorSubject<any>;
	designStatus 	: BehaviorSubject<any>;



	/*
	 *
	 * Constructor
	 *
	 *
	 */
	constructor(
		public afs 			: AngularFirestore,
	)
	{
		this.projectStatus 	= new BehaviorSubject([]);
		this.versionStatus 	= new BehaviorSubject([]);
		this.designStatus 	= new BehaviorSubject([]);
	}





	/**
	 * Resolver -  This needs to be deleted
	 *
	 * @param {ActivatedRouteSnapshot} route
	 * @param {RouterStateSnapshot} state
	 * @returns {Observable<any> | Promise<any> | any}
	 */
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
	{
		return new Promise((resolve, reject) => {

			Promise.all([
			]).then(
				() => {
					resolve();
				},
				reject
			);
		});
	}



	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO SIMPLY RETURN DATA TO THE COMPONENT
	//
	// -----------------------------------------------------------------------------------------------------

	/**
	* 
	*  Return the product stages
	*
	**/
	getProductStages() :string[] {
		return ['Design', 'Deposit', 'Approval', 'Fabrication', 'Balance', 'Delivery', 'Feedback']
	}




	/**
	* 
	*  Return initial product settings
	*
	**/
	getInitialStageStatus() :boolean[] {
		return [true, false, false, false, false, false, false]
	}



	/**
	* 
	*  Return initial selected status
	*
	**/
	getInitialSelectedStatus() :boolean[] {
		return [true, false, false, false, false, false, false]
	}



	/**
	* 
	*  Return initial selected status
	*
	**/
	getStageTexts() :object[] {
		return [ { 'done' : 'While in the design phase, you can create as many versions as desired. Once you are happy with a version, you can look at a quote and then submit that version for purchase. When that is complete, a deposit can be made. After the deposit, Mak Studio will contact you for approval.',
					'notdone' : 'NA'},
				 { 'done' : 'Your deposit has been received.',
				   'notdone' : 'Once you are happy with a design version, you can look at the quote from either this page or the design studio. From there, you can make a deposit to move forward.'  } ]
	}



}
