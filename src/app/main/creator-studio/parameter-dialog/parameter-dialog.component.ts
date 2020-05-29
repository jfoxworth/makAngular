import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from 'app/main/creator-studio/creator-studio.component';

// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';

// Services
import { DesignService } from 'app/main/services/design-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';

import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';


@Component({
  selector: 'parameter-dialog',
  templateUrl: './parameter-dialog.component.html',
  styleUrls: ['./parameter-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class editParameterDialog implements OnInit {

  constructor(
	private FirebaseService : FirebaseService,
	private DesignService : DesignService,
	private afStorage : AngularFireStorage,
	public dialogRef: MatDialogRef<editParameterDialog>,
	@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

	onNoClick(): void {
		this.dialogRef.close({data:this.data});
	}

	ngOnInit(): void {
	}



	/*
	*
	* When the user uploads a file
	*
	*/
	uploadFile( event, paramId ) 
	{
		console.log('Uploading a file to the parameter '+paramName);

		// Get the file and the image type
		const file = event.target.files[0];
		var imageType = file.type.replace('image/','');


		// Get a unique id for the upload and the path
		var text= this.DesignService.makeRandom(6);
		var path = '/studio/select/'+this.versionData.uid+'-'+text+'.'+imageType;			

		console.log('Uploading image to Upload select');

		// Upload file
		const task = this.afStorage.upload(path, event.target.files[0]);

		// Store the path in the version variable 
		if ( data.currentDesign.parameterMenus[data.i]['parameters'][data.j]['images'] === undefined )
		{
			data.currentDesign.parameterMenus[data.i]['parameters'][data.j]['images'] = []	
		}

		// Update the version data
		this.versionData.uploadedImage = {'path':path, 'parameter' : 'Upload Logo'};
		this.saveVersion( this.versionData );

	}



}

