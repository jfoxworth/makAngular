import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

// The dialog component
import { EditBioDialog } from './edit-dialog/edit-dialog.component';

// Services
import { UserService } from 'app/main/services/user-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';


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
		private FirebaseService : FirebaseService
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




}