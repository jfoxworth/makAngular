import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

// The dialog component
import { EditBioDialog } from './edit-dialog/edit-dialog.component';

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


	userData : any;
	userInfo : any;
	displayName : string;
	userId : string;
	dataFlag : boolean;
	displayStyle : string = 'display';


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
		this.getProfileImage();

		console.log('The user ID I got was '+this.userId);

		console.log(this.userData);

		if ( (this.userId == '') || ( this.userId === null ) )
		{
			if ( ( this.userData !== null ) && ( this.userData !== undefined ) )
			{
				this.userInfo = this.FirebaseService.getDocById( 'users', this.userData.uid ).then(response=> {
					this.userInfo=response.data();
					this.dataFlag=true;
				});
			}
		}else
		{
			this.userInfo = this.FirebaseService.getDocById( 'users', this.userId ).then(response=> {
				this.userInfo=response.data();
				this.dataFlag=true;
			});		
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
        	finalize(() => this.userData.profileImage = ref.getDownloadURL()) 
    	 )
    	.subscribe()


  	}






	/**
	*
	* Fetch the profile image if there is one
	*
	**/
	getProfileImage():void {

		if ( this.userData.imageType  === undefined )
		{
			var path = '/profile/default.jpeg';
		}else{
			var path = '/profile/'+this.userData.uid+'.'+this.userData.imageType;			
		}


		// Get URL
		const ref = this.afStorage.ref(path);
		this.userData.profileImage = ref.getDownloadURL();


  	}



}