import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editParameterDialog } from './parameter-dialog/parameter-dialog.component';
import { SubmenuDialog } from './submenu-dialog/submenu-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';


// Services
import { DesignService } from 'app/main/services/design-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';

import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';


export interface DialogData {
  currentDesign: any;
  i:number;
  j:number;
  parameterTypes:string[]
  iconOptions:string[],
  parameterUrls: any;
}


@Component({
  selector: 'app-creator-studio',
  templateUrl: './creator-studio.component.html',
  styleUrls: ['./creator-studio.component.scss', 
  			  '../e-commerce/e-commerce.component.scss', 
  			  '../store/product/product.component.scss', 
  			  '../design-studio/sidebar/sidebar.component.scss',
  			  '../design-studio/slider.component.scss']
})
export class CreatorStudioComponent implements OnInit {

	constructor(public dialog: MatDialog, 
				private DesignService : DesignService,
				private AuthService : AuthService,
				private FirebaseService : FirebaseService,
				private SnackBar: MatSnackBar,
				private afStorage : AngularFireStorage,
				public vcRef: ViewContainerRef ) 
	{

		this.designList		= [];
		this.designType		= this.DesignService.getDesignTypes();
		this.companies		= this.DesignService.getCompanies();
		this.menuLocations	= this.DesignService.getMenuLocations();
		this.carouselUrls 	= [];
		this.parameterUrls	= [];
	 }


	designList : any;
	designType : any;
	designTemplate : any;
	parameterTemplate : any;
	currentDesign : any;
	companies : any;
	menuLocations : any;
	dataFlag : boolean = false;
	dataFlag2 : boolean = false;
	changesExist : boolean = false;

	// Variables needed for the BG image
	carouselUrls : Array<any>;
	imageUrls : Array<any>;
	parameterUrls : Array<any>;



	  drop(event: CdkDragDrop<string[]>) {
	  	console.log(event.container);
	  	console.log(event.previousContainer);
		if (event.previousContainer === event.container) {
		  moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
		  transferArrayItem(event.previousContainer.data,
							event.container.data,
							event.previousIndex,
							event.currentIndex);
		}
	  }













	ngOnInit(): void {

		// Pull the list of existing designs for this user	
		this.FirebaseService.getDocsByUserId( 'designs', 'designerId' )
			.then((snapshot) => {
				var tempArray = [];
				var docData;
				snapshot.forEach((doc) => {
					docData=doc.data();
					docData.uid=doc.id;
					console.log(doc.id, '=>', doc.data());
					tempArray.push(docData);
				});
				this.designList = tempArray;
				if (this.designList.length>0)
				{
					this.currentDesign = this.designList[0];
					this.formatDesignData();
				}
			})
			.catch((err) => {
			  console.log('Error getting documents', err);
			});

	}







	/**
	 * When a new design is added
	 */
	newDesign( ): void
	{
		var newId = this.FirebaseService.createDocInCollection( 'designs', this.DesignService.getNewDesign( '' ) )
		this.designList.push(this.DesignService.getNewDesign( newId ));
		this.currentDesign = this.designList[this.designList.length-1];
		console.log(this.designList);
	}







	/**
	 * When someone sets a company
	 */
	setCompany() {
		console.log('Set the company ID to '+this.currentDesign.companyId);
		for (let i = 0; i < this.companies.length; i++) {
			console.log('Comparing '+this.companies[i]['id']+' to '+this.currentDesign.companyId);
			if ( this.companies[i]['id'] == this.currentDesign.companyId )
			{
				this.currentDesign['company']['name'] = this.companies[i]['name'];
				this.currentDesign['company']['id'] = this.companies[i]['id'];
				this.currentDesign['company']['location'] = this.companies[i]['location'];
				this.currentDesign['company']['logo'] = this.companies[i]['logo'];
			}
  		}

  		console.log('Setting the current design');
  		console.log(this.currentDesign);
	}











	/**
	 * When someone adds a new submenu
	 */
	addSubmenu() {
		this.currentDesign['parameterMenus'].push(this.DesignService.getNewSubmenu());
	}










	/**
	 * When someone adds a new item to a submenu
	 */
	addMenuItem(menuIndex) {
		this.currentDesign['parameterMenus'][menuIndex]['parameters'].push(this.DesignService.getNewParameter());
	}







	/**
	 * Dialog to edit a parameter
	 */
	openDialog(i,j) {
		console.log('In the open dialog with '+i+' - '+j);
		const dialogRef = this.dialog.open( editParameterDialog, {
			panelClass: 'parameter-dialog',
			data: { currentDesign: this.currentDesign, 
					i:i, 
					j:j, 
					parameterTypes: this.DesignService.getParameterTypes(),
					parameterUrls: this.parameterUrls }
		});

		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		  console.log(result);
		});

	}





	/**
	 * Dialog to edit a submenu
	 */
	openSubmenuDialog(i) {
		console.log('In the open submenu dialog with '+i);
		const dialogRef = this.dialog.open( SubmenuDialog, {
			panelClass: 'submenu-dialog',
			data: { currentDesign: this.currentDesign, 
					i:i,
					iconOptions : this.DesignService.getIconOptions()
				  }
		});

		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		  console.log(result);
		});

	}












	/**
	 * When a user makes a change to a design and those changes are saved
	 */
	saveDesignChanges( ) {

		console.log('Saving design changes for '+this.currentDesign.uid);
		console.log(this.currentDesign);

		let tD = JSON.parse( JSON.stringify( this.currentDesign ) );

		// Clean the observables out from the design object
		for (var a=1; a<tD['parameterMenus'].length; a++)
		{
			for (var b=0; b<tD['parameterMenus'][a]['parameters'].length; b++)
			{
				for (var c=0; c<tD['parameterMenus'][a]['parameters'][b]['images'].length; c++)
				{
					tD['parameterMenus'][a]['parameters'][b]['images'][c]['imageUrl'] = '';
				}
			}
		}

	
		this.FirebaseService.updateDocDataUsingId( 'designs', this.currentDesign.uid, tD )
		.then((snapshot) => {
			this.SnackBar.open('Design is updated','', {duration: 4000});
		})
		.catch((err) => {
		  console.log('Error getting documents', err);
		});


	}











	/**
	 * Check the formula entered by the user for price
	 */
	checkPriceFormula() {
		console.log('In the check price formula function');

		this.currentDesign.priceArray=[];
		var re = /[a-zA-Z]/g; 
		var re2 = /[0-9.]/g; 
		var re3 = /[\+\-\*\/]/g; 
		var re4 = /[a-zA-Z0-9.]/g; 
		let replaceString = this.currentDesign['priceFormula'];
		let stringToSplit = this.currentDesign['priceFormula'].replace(/\+/g, '&&+&&');
		stringToSplit = stringToSplit.replace(/\-/g, '&&-&&');
		stringToSplit = stringToSplit.replace(/\*/g, '&&*&&');
		stringToSplit = stringToSplit.replace(/\//g, '&&/&&');
		stringToSplit = stringToSplit.replace(/\(/g, '&&(&&');
		stringToSplit = stringToSplit.replace(/\)/g, '&&)&&');
		stringToSplit = stringToSplit.replace(/^\s+/, '');
		stringToSplit = stringToSplit.replace(/\s+$/, '');
		stringToSplit = stringToSplit.replace(/&&\s+&&/g, '&&');
		stringToSplit = stringToSplit.replace(/&&&&/g, '&&');
		stringToSplit = stringToSplit.replace(/^&+/, '');
		stringToSplit = stringToSplit.replace(/&+$/, '');
		let splitString = stringToSplit.split('&&');


		for (let i = 0; i < splitString.length; i++) {

			splitString[i] = splitString[i].replace(/^\s+/, '');
			splitString[i] = splitString[i].replace(/\s+$/, '');


			for (let j = 0; j < this.currentDesign.parameterMenus.length; j++) {

				for (let k = 0; k < this.currentDesign.parameterMenus[j].parameters.length; k++) {

					console.log('Comparing '+splitString[i]+' to '+this.currentDesign.parameterMenus[j].parameters[k]['shapediver']);
					if ( splitString[i] == this.currentDesign.parameterMenus[j].parameters[k]['shapediver'] )
					{
						console.log('Match');
						this.currentDesign.priceArray[i] = { 'status' : 'parameter', 'text' : splitString[i] }	

					}else if ( ( /^\d.+$/.test(splitString[i]) ) && ( !( /[a-zA-Z]+$/.test(splitString[i]) ) ) )
					{
						this.currentDesign.priceArray[i] = { 'status' : 'number', 'text' : splitString[i]};				
					

					}else if ( splitString[i].match(re3) &&  !/^\d.+$/.test(splitString[i]) && !( /[a-zA-Z]+$/.test(splitString[i]) ) )
					{
						this.currentDesign.priceArray[i] = { 'status' : 'operator', 'text' : splitString[i]};						
					
					}else if ( (splitString[i] == "(") || ( splitString[i] == ")" ) )
					{
						this.currentDesign.priceArray[i] = { 'status' : 'parenthesis', 'text' : splitString[i]};												

					}else
					{
						if ( this.currentDesign.priceArray[i] === undefined )
						{
							this.currentDesign.priceArray[i] = { 'status' : 'invalid', 'text' : splitString[i]};						
						}
					}
				}
	  		}
	  	}

		for (let i = 0; i < this.currentDesign.priceArray.length; i++) {
			var priceValid = true;
			if ( this.currentDesign.priceArray[i].status == 'invalid' )
			{
				priceValid = false;
			}
		}
		this.currentDesign.priceValid = priceValid;

		if (priceValid) { this.setPrice(); }else { this.currentDesign.price = 'NA'; } 

	}





	/*
	*
	* Set the price
	*
	*/
	setPrice() {
		console.log('In the set price formula function');


		let priceString = '';
		for (let i = 0; i < this.currentDesign.priceArray.length; i++) {

			if ( this.currentDesign.priceArray[i].status == 'parameter' )
			{
				for (let j = 0; j < this.currentDesign.parameterMenus.length; j++) {

					for (let k = 0; k < this.currentDesign.parameterMenus[j].parameters.length; k++) {

						if ( this.currentDesign.parameterMenus[j].parameters[k]['shapediver'] == this.currentDesign.priceArray[i]['text'] )
						{
							priceString = priceString+this.currentDesign.parameterMenus[j].parameters[k]['value'];
						}
					}

				}

			}else
			{
				priceString = priceString + this.currentDesign.priceArray[i].text;				
			}
		}

		this.currentDesign.priceString = priceString;
		this.currentDesign.price = eval(priceString);

		console.log('The current object is ');
		console.log(this.currentDesign);

	}





	/*
	*
	* When the background image is uploaded
	*
	*/
	onBGUpload(event) {


		// Grab the background image
		const file = event.target.files[0];
		console.log('The target is ...');
		console.log(event.target.files);

		var imageType = file.type.replace('image/','');


		let text = "";
		let possible = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for (let i = 0; i < 6; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
  		}
		var path = '/marketplace/carousel/'+this.currentDesign.uid+'-'+text+'.'+imageType;			


		// Get URL
		const ref = this.afStorage.ref(path);

		// Upload file and subscribe to results
		const task = this.afStorage.upload(path, event.target.files[0]);
		task.snapshotChanges().pipe(
        	finalize(() => this.carouselUrls.push(ref.getDownloadURL()) )
    	 )
    	.subscribe()



		this.currentDesign.marketplace.images.push({ 'path': path, 'mainImage':false });
		this.saveDesignChanges( );

  	}








  	/*
  	*
  	*	This function formats the image data necessary
  	*
  	*/
	formatDesignData(){

		this.carouselUrls = [];
		this.parameterUrls = JSON.parse( JSON.stringify( this.currentDesign.parameterMenus ));

		for (var b=0; b<this.currentDesign.marketplace.images.length; b++)
		{

			const ref = this.afStorage.ref(this.currentDesign.marketplace.images[b]['path']);
			this.carouselUrls.push(ref.getDownloadURL());

			for (var c=0; c<this.currentDesign.parameterMenus.length; c++)
			{
				for (var d=0; d<this.currentDesign.parameterMenus[c]['parameters'].length; d++)
				{

					if ( this.currentDesign.parameterMenus[c]['parameters'][d]['images'] === undefined )
					{
						this.currentDesign.parameterMenus[c]['parameters'][d]['images'] = [];
					}
					for (var e=0; e<this.currentDesign.parameterMenus[c]['parameters'][d]['images'].length; e++)
					{

						const ref = this.afStorage.ref(this.currentDesign.parameterMenus[c]['parameters'][d]['images'][e]['path']);
						this.parameterUrls[c]['parameters'][d]['images'][e]['imageUrl'] = ref.getDownloadURL();
					}
				}
			}
		}
		this.dataFlag=true;

		console.log('The carousel URLs are ...');
		console.log(this.carouselUrls);

		console.log('The parameter URLs are ...');
		console.log(this.parameterUrls);

		console.log('The currentDesign is ...');
		console.log(this.currentDesign);
	}




  	/*
  	*
  	*	This function simply sets the main image
  	*
  	*/
	setMainImage(thisIndex){
		for (var a=0; a<this.currentDesign.marketplace.images.length; a++)
		{
			if ( a == thisIndex )
			{
				this.currentDesign.marketplace.images[a]['mainImage']=true;
			}else
			{
				this.currentDesign.marketplace.images[a]['mainImage']=false;
			}
		}
	}





  	/*
  	*
  	*	This function simply sets the main image
  	*
  	*/
	onColorChanged(){
		console.log('Color changed');
	}


}


	 