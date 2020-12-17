
// Common Angular Items
import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";


// RXJS Items
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';


// Models
import { UserData } from '../../main/models/userData';


// Services
import { User } from "../../main/services/users";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


// NgRX
import {select, Store} from '@ngrx/store';
import { isLoggedIn, isLoggedOut, pullUserData } from '../../main/store/selectors/auth.selectors';
import { AppState } from '../../main/store/reducers';
import { AuthState } from '../../main/store/reducers';
import { writeUser } from '../../main/store/actions/auth.actions';



@Injectable({
  providedIn: 'root'
})
export class UserService {

	userStatus 	: BehaviorSubject<any>;
	userObject 	: BehaviorSubject<UserData>;
  userData$   : Observable<UserData>;
  isLoggedIn$ : Observable<boolean>;


	constructor(
        public afs 			  : AngularFirestore, 	// Inject Firestore service
        public afAuth 	  : AngularFireAuth, 		// Inject Firebase auth service
        public router 	  : Router,
        private afStorage : AngularFireStorage,
    		private store 		: Store<AuthState>,
  	) {
		this.userStatus 	= new BehaviorSubject([]);
		this.userObject 	= new BehaviorSubject(<UserData>{});
  	}




	// -----------------------------------------------------------------------------------------------------
	//
	// @ Logged in user observer and set user
	//
	// -----------------------------------------------------------------------------------------------------

  // return the stored user through the observable
  getUserData()
  {
    this.userData$ = this.store.select(pullUserData);
    this.userData$.subscribe(user=>{ this.userObject.next(user)})
  }


  // Called when a user is stored in local but was not logged in
  setUserData( userData:UserData )
  {
    this.store
        .pipe(
          take(1))
        .subscribe(state => {
          this.store.dispatch(writeUser({UserData : userData}));
        });
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
	// @ GET THE PROFILE IMAGE AND USER DATA
	//
	// -----------------------------------------------------------------------------------------------------

	getProfileImage( userData:UserData ) {

		if ( !userData )
		{
			var path = '/profile/default.jpeg';
		}else{
      if (!userData.imageType)
      {
        var path = '/profile/default.jpeg';
      }else
      {
  			var path = '/profile/'+userData.uid+'.'+userData.imageType;
      }
    }

		const ref = this.afStorage.ref(path);
		return ref.getDownloadURL();

  	}

	fetchUserData( userId:string )
	{
		return this.afs.collection('users', ref => ref.where('uid', '==', userId ))
		.get();

	}

	fetchUserPromise( userId:string )
	{
    return this.afs.collection('users').doc(userId).get().toPromise().then((userRef)=>{ return userRef});

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
