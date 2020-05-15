import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editParameterDialog } from './parameter-dialog/parameter-dialog.component';
import { SubmenuDialog } from './submenu-dialog/submenu-dialog.component';
import { MatSelectModule } from '@angular/material/select';

// Services
import { DesignService } from 'app/main/services/design-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';


export interface DialogData {
  currentDesign: any;
  i:number;
  j:number;
  parameterTypes:string[]
  iconOptions:string[];
}


@Component({
  selector: 'app-creator-studio',
  templateUrl: './creator-studio.component.html',
  styleUrls: ['./creator-studio.component.scss', '../e-commerce/e-commerce.component.scss', '../store/product/product.component.scss', '../design-studio/sidebar/sidebar.component.scss']
})
export class CreatorStudioComponent implements OnInit {

	constructor(public dialog: MatDialog, 
				private DesignService : DesignService,
				private AuthService : AuthService,
				private FirebaseService : FirebaseService) 
	{

		this.designList		= [];
		this.designType		= this.DesignService.getDesignTypes();
		this.companies		= this.DesignService.getCompanies();
		this.menuLocations	= this.DesignService.getMenuLocations();

	 }


	designList : any;
	designType : any;
	designTemplate : any;
	parameterTemplate : any;
	currentDesign : any;
	companies : any;
	menuLocations : any;




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
		this.designList = this.FirebaseService.getDocsByUserId('designs', 'designerId')
		.then(function(querySnapshot) {
        	var designList = [];
        	querySnapshot.forEach(function(doc) {
    	        console.log(doc.data());
        	    designList.push(doc.data());
        	});
        	return designList;
    	})


	}







	/**
	 * When a new design is added
	 */
	newDesign(): void
	{
		this.designList.push(this.DesignService.getNewDesign());
		this.currentDesign = this.designList[this.designList.length-1];
		this.FirebaseService.createDocInCollection( 'designs', this.DesignService.getNewDesign() )
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
	    			parameterTypes: this.DesignService.getParameterTypes() }
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

					if ( splitString[i] == this.currentDesign.parameterMenus[j].parameters[k]['label'] )
					{
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
						this.currentDesign.priceArray[i] = { 'status' : 'invalid', 'text' : splitString[i]};						
					}
				}
	  		}
	  	}
	}





}


	 