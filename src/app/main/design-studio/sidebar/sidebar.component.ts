

import { Component, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';

import { EventEmitter } from '@angular/core';

// Services
import { DesignStudioService } from 'app/main/services/design-studio.service';
import { CreatorStudioService } from 'app/main/services/creator-studio.service';
import { DesignSignoffsService } from 'app/main/services/design-signoffs.service';
import { ProjectsService } from 'app/main/services/projects.service';



// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';
import { signoffReq } from 'app/main/models/signoffReq';
import { designSignoff } from 'app/main/models/designSignoffs';
import { UserData } from 'app/main/models/userData';



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
	menuLocations 	: number[][] = this.DesignStudioService.getMenuLocations();
	menuShow 		: boolean[] = [false, false, false];


	@Input('designData') designData:makDesign;
	@Input('projectData') projectData:makProject;
	@Input('versionData') versionData:makVersion;
	@Input('versionList') versionList:makVersion[];
	@Input('signoffData') signoffData:designSignoff[];
	@Input('userData') userData:UserData;
	@Input('flowersJSON') flowersJSON:any;
	@Input('flowerFlag') flowerFlag:any;
	@Input('editableVersion') editableVersion:boolean;
	

	constructor( private CreatorStudioService 	: CreatorStudioService,
				 private DesignSignoffsService 	: DesignSignoffsService,
				 private DesignStudioService 	: DesignStudioService,
				 private ProjectsService 		: ProjectsService,
				 private router 				: Router
	 ) { }


	ngOnInit(): void {

  }


  	// FUNCTION TO HIDE/SHOW SIDE MENU BASED UPON WHAT IS CLICKED
	menuClick(param): void {
		this.designData.parameterMenus.forEach((value, index) => {
			this.menuShow[index] =  false;
		});

		this.menuShow[param] =  true;
	}




    // WHEN THE USER CLOSES THE WINDOW
    onMenuClose() {
		this.designData.parameterMenus.forEach((value, index) => {
			this.menuShow[index] =  false;
		});
    }


    // When a user wants to add a new project based upon a design
    addMyProject( ) {
		this.ProjectsService.createProject( this.designData, this.versionData  );
		this.router.navigateByUrl('/products');
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
