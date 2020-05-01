import { Component, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'app/main/user-service.service';
import { EditBioDialog } from './edit-dialog/edit-dialog.component';


export interface UserData {

	userData:any;

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
export class ProfileComponent
{
	/**
	 * Constructor
	 *
	 * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
	 */
	constructor(
		private _fuseTranslationLoaderService: FuseTranslationLoaderService,
		public dialog: MatDialog, 
		private UserService : UserService
	)
	{

		this.userData = this.UserService.getUser();
		//this._fuseTranslationLoaderService.loadTranslations(english, turkish);
	}


	userData : any;
}