import { Injectable, NgZone } from '@angular/core';

import { User } from "app/main/services/users";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone, // NgZone service to remove outside scope warning
        private afStorage : AngularFireStorage
  	) { }






	/**
	*
	* Fetch the profile image if there is one
	*
	**/
	getProfileImage( userData ) {

		console.log('In the getProfileImage, I am using the id of '+userData.uid);
		console.log(userData);

		if ( userData.imageType  === undefined )
		{
			console.log('The image type is undefined');
			var path = '/profile/default.jpeg';
		}else{
			var path = '/profile/'+userData.uid+'.'+userData.imageType;			
			console.log('The path is '+path);
		}


		// Get URL
		const ref = this.afStorage.ref(path);
		return ref.getDownloadURL();

  	}







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
