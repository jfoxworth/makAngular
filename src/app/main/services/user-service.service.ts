
// Common Angular Items
import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";


// RXJS Items
import { BehaviorSubject, Observable } from 'rxjs';


// Services
import { User } from "app/main/services/users";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UserService {

	userStatus 		: BehaviorSubject<any>;

	constructor(
        public afs 			: AngularFirestore, 	// Inject Firestore service
        public afAuth 		: AngularFireAuth, 		// Inject Firebase auth service
        public router 		: Router,
        public ngZone 		: NgZone,  				// NgZone service to remove outside scope warning
        private afStorage 	: AngularFireStorage
  	) { 
		this.userStatus 	= new BehaviorSubject([]);
  	}






	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR USERS - NO CREATE BECAUSE THAT IS DONE UPON SIGNUP. NO DELETE
	//
	// -----------------------------------------------------------------------------------------------------


	// Read one user
	getUserById( userId:string )
	{ 
		this.afs.collection('users').doc( userId )
		.valueChanges()
		.subscribe((result) => {

			result['uid'] = userId;
			this.userStatus.next(result);
			
		});
	}


	// Update a user
	updateUser( userObj )
	{
		this.afs.collection('users').doc( userObj.uid ).update( userObj );		
	}









	// -----------------------------------------------------------------------------------------------------
	//
	// @ TEST A USER NAME TO SEE IF IT EXISTS
	//
	// -----------------------------------------------------------------------------------------------------


	checkUserEmail( potentialEmail ) 
	{
		return this.afs.collection('users', ref => ref.where('email', '==', potentialEmail))
		.get();

	}







	// -----------------------------------------------------------------------------------------------------
	//
	// @ GET THE PROFILE IMAGE
	//
	// -----------------------------------------------------------------------------------------------------

	/**
	*
	* Fetch the profile image if there is one
	*
	**/
	getProfileImage( userData ) {

		if ( userData.imageType  === undefined )
		{
			var path = '/profile/default.jpeg';
		}else{
			var path = '/profile/'+userData.uid+'.'+userData.imageType;			
		}


		// Get URL
		const ref = this.afStorage.ref(path);
		return ref.getDownloadURL();

  	}

	fetchUserData( userId ) 
	{
		return this.afs.collection('users', ref => ref.where('uid', '==', userId ))
		.get();

	}



	// -----------------------------------------------------------------------------------------------------
	//
	// @ RETURN THE NEEDED STATIC ITEMS
	//
	// -----------------------------------------------------------------------------------------------------



	/**
	 * A list of years
	 */
	getYearList() {

		var i;
		var yearList = [];
		for (i = 2010; i > 1930; i--) { yearList.push(i); }
		return yearList
	}




	/**
	 * An array of months
	 */
	getMonthList() {

		return [
			'NA',
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December']
	}




	/**
	 * A clean user object
	 */
	getNewUser() {
		return {
			'id'	  		: '',
			'username'		: '',
			'info'			: {
				'firstname'   	: '',
				'lastname'		: '',
				'gender'		: '',
				'birthdate'		: '',
				'birthmonth'	: '',
				'birthyear' 	: '',
				'locations' 	: [],
				'about'			: '',
				'occupation'	: '',
				'skills'		: '',
				'jobs'			: [],
				'address'		: '',
				'telephone'		: [],
				'website' 		: [],
				'emails' 		: []
			}
		}
	}











	/**
	 * A populated user object
	 */
	getUser() {
		return {
			'id'	  		: '',
			'username'		: 'joshuaf',
			'info'			: {
				'firstname'   	: 'Joshua',
				'lastname'		: 'Foxworth',
				'gender'		: 'Male',
				'birthdate'		: '24',
				'birthmonth'	: '6',
				'birthyear' 	: '1976',
				'locations' 	: ['London, UK', 'New York, USA'],
				'about'			: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget pharetra felis, sed ullamcorper dui. Sed et elementum neque. Vestibulum pellente viverra ultrices. Etiam justo augue, vehicula ac gravida a, interdum sit amet nisl. Integer vitae nisi id nibh dictum mollis in vitae tortor.',
				'occupation'	: 'Developer',
				'skills'		: 'C#, PHP, Javascript, Angular, JS, HTML, CSS',
				'jobs'			: [{'title' : 'Self-Employed', 'startdate':'2010', 'enddate':'Now'},{'title' : 'Google', 'startdate':'2008', 'enddate':'2010'}],
				'address'		: 'Ut pharetra luctus est quis sodales. Duis nisi tortor, bibendum eget tincidunt, aliquam ac elit. Mauris nec euismod odio.',
				'telephone'		: ['+6 555 6600', '+9 555 5255'],
				'website' 		: ['www.joshuafoxworth.com'],
				'email' 		: ['mail@withinpixels.com', 'mail@creapond.com']
			}
		}
	}







}
