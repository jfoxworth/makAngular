import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';


// Services
import { UserService } from 'app/main/services/user-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { finalize } from 'rxjs/operators';



export interface UserData {

	userData:any;
	userInfo:any;

}

//import { locale as english } from './i18n/en';
//import { locale as turkish } from './i18n/tr';

@Component({
	selector   : 'profile',
	templateUrl: './profile.component.html',
	styleUrls  : ['./profile.component.scss'],
	encapsulation : ViewEncapsulation.None,
	animations   : fuseAnimations
})
export class ProfileComponent implements OnInit
{
	/**
	 * Constructor
	 *
	 * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
	 */
	constructor(
		private _fuseTranslationLoaderService: FuseTranslationLoaderService,
		private route: ActivatedRoute,
		public dialog: MatDialog, 
		private UserService : UserService,
		private AuthService : AuthService,
		private FirebaseService : FirebaseService,
        public afs: AngularFirestore,
        private SnackBar: MatSnackBar,
        private afStorage : AngularFireStorage
	)
	{

		//this.userData = this.UserService.getUser();
		//this._fuseTranslationLoaderService.loadTranslations(english, turkish);
	}


	userData 		: any = {};				// Info for the logged in user				
	userInfo 		: any = {};				// Info for the user whose page is being viewed
	canEdit			: boolean = false;		// Can the viewer edit the profile
	displayName 	: string;
	userId 			: string;
	dataFlag 		: boolean = false;
	displayStyle 	: string = 'display';
	profileImage 	: any;					// Image for the user whose page is being viewed


	/**
	 * Update the image or username
	 */
	updateProfile ()
	{
		this.AuthService.UpdateProfile();	
	}



	ngOnInit() {


		this.userData = JSON.parse(localStorage.getItem('userData'));
		this.userId = this.route.snapshot.paramMap.get('id');

		// No user defined by URL or by login
		if ( ( (this.userId == '') || ( this.userId === null ) || ( this.userId === undefined ) ) &&
		   ( ( this.userData === null ) || ( this.userData === undefined ) || ( this.userData == 'undefined' ) ) )
		{
			this.userInfo = {};
			this.userData = {};
			this.displayStyle = "NoUser";


		// A user is defined by URL
		}else if ( (this.userId != '') && ( this.userId !== null ) && ( this.userId !== undefined ) )
		{
			this.FirebaseService.getDocById( 'users', this.userId ).then(response=> {
				this.userInfo=response.data();
		        this.profileImage = this.UserService.getProfileImage( this.userInfo );
				if ( ( this.userData !== null ) && ( this.userData !== undefined ) )
				{
					if ( this.userInfo.uid == this.userData.uid ){ this.canEdit=true; }
				}
				this.dataFlag=true;
				this.displayStyle='display';
			});
		

		// Looking at user defined by the URL, but the user is logged in
		}else if ( ( this.userData !== null ) && ( this.userData !== undefined ) && ( this.userData !== {} ) )
		{

			/*
			console.log('2. The user data for a user logged in with no URL is ...');
			console.log(this.userData);
			console.log('2. The userId is ');
			console.log(this.userId);
			this.userInfo = this.FirebaseService.getDocById( 'users', this.userData.uid ).then(response=> {
				this.userInfo=response.data();
		        this.profileImage = this.UserService.getProfileImage( this.userData );
				this.dataFlag=true;
				console.log('2. The userInfo is now ');
				console.log(this.userInfo);
			});		

			*/
			this.userInfo = this.userData;
			this.profileImage = this.UserService.getProfileImage( this.userData );
			this.dataFlag=true;
			this.canEdit=true;
		
		}else
		{

			console.log('I got nothing');

		}


	};




	/**
	*
	* When the data needs to be saved
	*
	**/
	saveChanges():void{

		console.log('Saving user data '+this.userData.uid);
		this.FirebaseService.updateDocDataUsingId('users', this.userData.uid, this.userData );
		this.userInfo = this.userData;
		this.SnackBar.open('Data Saved','', {duration: 4000});
		localStorage.setItem('userData', JSON.stringify(this.userData));

	}




	/**
	*
	* When the background image is uploaded
	*
	**/
	onUpload(event) {


		// Grab the background image
		const file = event.target.files[0];
		console.log('The target is ...');
		console.log(event.target.files);

		var imageType = file.type.replace('image/','');
		var path = '/profile/'+this.userData.uid+'.'+imageType;			


		// Get URL
		const ref = this.afStorage.ref(path);

		// Store image type
		this.userData.imageType = imageType;
		this.saveChanges();

		// Upload file and subscribe to results
		const task = this.afStorage.upload(path, event.target.files[0]);
		task.snapshotChanges().pipe(
        	finalize(() => this.profileImage = ref.getDownloadURL()) 
    	 )
    	.subscribe()


  	}






	/**
	*
	* Fetch the profile image if there is one
	*
	**/
	getProfileImage( userId ):void {

		this.profileImage = this.UserService.getProfileImage( userId );

  	}




}