
/*

		This is the service for the authentication items for the firebase
		system.

*/


// Common angular items
import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";


// Firebase items
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


// Models
import { UserData } from "../models/userData";


// NGRX Items
import { select, Store } from "@ngrx/store";
import { AuthState } from '../../main/store/reducers';
import { login, logout } from '../../main/store/actions/auth.actions';
import { AuthActions } from '../../main/store/actions/authAction-types';


@Injectable({
	providedIn: 'root'
})

export class AuthService {
	userData: any; // Save logged in user data

	constructor(
		public afs: AngularFirestore,	 	// Inject Firestore service
		public afAuth: AngularFireAuth, 	// Inject Firebase auth service
		public router: Router,
		public ngZone: NgZone, 				// NgZone service to remove outside scope warning
		private store: Store<AuthState>
	) {
		/* Saving user data in localstorage when
		logged in and setting up null when logged out */
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.userData = user;
				localStorage.setItem('user', JSON.stringify(this.userData));
				JSON.parse(localStorage.getItem('user'));
			} else {
				localStorage.setItem('user', null);
				JSON.parse(localStorage.getItem('user'));
			}
		})
	}




	// Sign in with email/password
	SignIn(email, password) {
		return this.afAuth.signInWithEmailAndPassword(email, password)
			.then((result) => {
				this.ngZone.run(() => {


			var docRef = this.afs.collection('users').doc(result.user.uid);
			docRef.ref.get()
			.then(response=> {
				let userData = <UserData>response.data();
				localStorage.setItem('UserData', JSON.stringify(response.data()));
				console.log('Setting user data to ')
				console.log(response.data());
				this.store.dispatch(login({UserData : userData}));
						this.router.navigate(['dashboard']);
			});
				});
				//this.SetUserData(result.user);
			}).catch((error) => {
				window.alert(error.message)
			})
	}

	// Sign up with email/password
	SignUp(email, password, name:string) {
		return this.afAuth.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				/* Call the SendVerificaitonMail() function when new user sign
				up and returns promise */
				this.SendVerificationMail();
				this.SetUserData(result.user);
				this.afs.collection('users').doc( result.user.uid ).update(
					{
						id : result.user.uid,
						email : result.user.email,
						displayName : name,
						dateCreated:new Date(),
						admin:false
					}
				 );
				this.SignIn(email, password);
			}).catch((error) => {
				window.alert(error.message)
			})
	}

	// Send email verfificaiton when new user sign up
	SendVerificationMail() {
		return this.afAuth.currentUser.then(u => u.sendEmailVerification())
		.then(() => {
			this.router.navigate(['/dashboard']);
		})
	}


	// Reset Forggot password
	ForgotPassword(passwordResetEmail) {
		return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
		.then(() => {
			window.alert('Password reset email sent, check your inbox.');
		}).catch((error) => {
			window.alert(error)
		})
	}

	// Returns true when user is looged in and email is verified
	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user'));
		return (user !== null && user.emailVerified !== false) ? true : false;
	}


	// Auth logic to run auth providers
	AuthLogin(provider) {
		return this.afAuth.signInWithPopup(provider)
		.then((result) => {
			 this.ngZone.run(() => {
					this.router.navigate(['dashboard']);
				})
			//this.SetUserData(result.user);
		}).catch((error) => {
			window.alert(error)
		})
	}

	/* Setting up user data when sign in with username/password,
	sign up with username/password and sign in with social auth
	provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
	SetUserData(user) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
		const userData: UserData = {
			uid: user.uid ? user.uid : '',
      email: user.email,
			displayName: user.displayName ? user.displayName : '',
			photoURL: user.photoURL ? user.photoURL : '',
			emailVerified: user.emailVerified ? user.emailVerified : '',
			shortBio : user.shortBio ? user.shortBio : '',
			website : user.website ? user.website : '',
			imageType : user.imageType ? user.imageType : '',
			designer : user.designer ? user.designer : '',
			dateCreated : user.dateCreated ? user.dateCreated : '',
			admin : user.admin ? user.admin : false
		}
		return userRef.set(userData, {
			merge: true
		})
	}

	// Sign out
	SignOut() {
		return this.afAuth.signOut().then(() => {
			localStorage.removeItem('user');
			localStorage.removeItem('userData');
			localStorage.removeItem('UserData');
			this.store.dispatch(logout());
			this.router.navigate(['login']);
		})
	}

	// Update Profile Data
	UpdateProfile() {
		return this.afAuth.currentUser
			.then((result) => { result.updateProfile({
				displayName : "My Name",
				photoURL: "https://example.com/jane-q-user/profile.jpg"
		})
		});
	}

}
