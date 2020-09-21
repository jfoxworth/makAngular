import { Component, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';

// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';

import { EventEmitter } from '@angular/core';

// Services
import { CreatorStudioService } from 'app/main/services/creator-studio.service';
import { DesignSignoffsService } from 'app/main/services/design-signoffs.service';



// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';
import { signoffReq } from 'app/main/models/signoffReq';
import { designSignoff } from 'app/main/models/designSignoffs';



// Angular Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDividerModule } from '@angular/material/divider';






@Component({
  selector: 'design-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', '../slider.component.scss']
})
export class SidebarComponent implements OnInit {


	@Output() updateParameter = new EventEmitter();
	@Output() uploadFile = new EventEmitter();
	@Output() setVersionData = new EventEmitter();
	@Output() createNewVersion = new EventEmitter();
	@Output() loadModel = new EventEmitter();

	thisValue 		: number=5;
	blobSelectIndex : number = 0;
	signoffStatus 	: number = 0;
	signoffComments : string;

	@Input('designData') designData:any;
	@Input('versionList') versionList:any;
	@Input('versionData') versionData:any;
	@Input('signoffData') signoffData:designSignoff[];
	@Input('userData') userData:any;
	@Input('flowersJSON') flowersJSON:any;
	@Input('flowerFlag') flowerFlag:any;
	@Input('editableVersion') editableVersion:boolean;
	

	constructor( private CreatorStudioService 	: CreatorStudioService,
				 private DesignSignoffsService 	: DesignSignoffsService
	 ) { }


	ngOnInit(): void {

  }


  	// FUNCTION TO HIDE/SHOW SIDE MENU BASED UPON WHAT IS CLICKED
	menuClick(param): void {
		this.designData.parameterMenus.forEach((value, index) => {
			this.designData.menuShow[index] =  false;
		});

		this.designData.menuShow[param] =  true;
	}




    // WHEN THE USER CLOSES THE WINDOW
    onMenuClose() {
		this.designData.parameterMenus.forEach((value, index) => {
			this.designData.menuShow[index] =  false;
		});
    }


    // When a user wants to add a new project based upon a design
    addMyProject( designId:string ) {
    	console.log('I should be adding a new design with the ID of '+designId);
    }


    // Convert hex to RGB
    hexToRGB( hexCode:string ):string {
    	return this.CreatorStudioService.hexToRGB( hexCode )
    }



    // Format color to be sent to shapediver
    formatColor( hexCode:string ):string {
    	return hexCode.replace('#', '0x')+'AA';
    }



    // Stringify an object
    stringify( ots:object ):string {
    	return JSON.stringify( ots )
    }


    // Add a new item to the blob
	addNewItemToBlob():void
	{
		this.flowersJSON['flowers'].splice({'size':'', 'position':[], 'rotation': ''});
	}



    // Delete an item from the blob
	deleteItemFromBlob( index:number ):void
	{
		this.flowersJSON['flowers'].splice( index, 1 );
	}



    // Delete an item from the blob
	createNewSignoff( ):void
	{
		this.DesignSignoffsService.createDesignSignoff( JSON.parse(localStorage.getItem('user')), 
														this.designData.id, 
														this.signoffStatus, 
														this.signoffComments );

	}



}
