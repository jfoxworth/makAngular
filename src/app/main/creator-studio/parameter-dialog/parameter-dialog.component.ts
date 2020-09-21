

/*
*
*
*	This is the controller for the parameter dialog. The data for the view
*	comes from the main controller for the creator studio. The design is 
*	altered from here, but no call is made to the server to update the 
* 	data. The user must press the button for that.
*
*
*/


// Common Angular Items and Dialog items
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'app/main/creator-studio/creator-studio.component';



// RXJS Items
import { finalize } from 'rxjs/operators';


// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';



// Services
import { CreatorStudioService } from 'app/main/services/creator-studio.service';



// Firebase items
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
	selector: 'parameter-dialog',
	templateUrl: './parameter-dialog.component.html',
	styleUrls: ['./parameter-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class editParameterDialog implements OnInit {

	constructor(
		private CreatorStudioService 	: CreatorStudioService,
		private afStorage 				: AngularFireStorage,
		public dialogRef 				: MatDialogRef<editParameterDialog>,
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
		console.log('Uploading an image file to the parameter '+paramId);

		// Get the file and the image type
		const file = event.target.files[0];
		var imageType = file.type.replace('image/','');


		// Get a unique id for the upload and the path
		var text= this.CreatorStudioService.makeRandom(6);
		var path = '/studio/select/'+this.data.currentDesign.uid+'-'+text+'.'+imageType;			
		let tL = this.data.currentDesign.parameterMenus[this.data.i]['parameters'][this.data.j]['images'].length;


		// Get URL Reference
		const ref = this.afStorage.ref(path);


		// Store the path in the version variable 
		if ( this.data.currentDesign.parameterMenus[this.data.i]['parameters'][this.data.j]['images'] === undefined )
		{
			this.data.currentDesign.parameterMenus[this.data.i]['parameters'][this.data.j]['images'] = []	
		}

		// prefill the parameter Url
		this.data.parameterUrls[this.data.i]['parameters'][this.data.j]['images'].push({});


		// Update the version data
		this.data.currentDesign.parameterMenus[this.data.i]['parameters'][this.data.j]['images'].push( {'path':path, 
																										'id':this.data.currentDesign.uid+'-'+text,
																										'order' : tL,
																										'label' : 'Image Label',
																										'imageUrl' : '',
																										'value' : tL } );

		// Upload file
		const task = this.afStorage.upload(path, event.target.files[0]);
		task.snapshotChanges().pipe(
		        	finalize(() => this.data.parameterUrls[this.data.i]['parameters'][this.data.j]['images'][tL]['imageUrl']= ref.getDownloadURL() )
    	 )
    	.subscribe()

	}









}

