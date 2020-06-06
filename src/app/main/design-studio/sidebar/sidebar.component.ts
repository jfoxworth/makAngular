import { Component, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';

// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';

import { EventEmitter } from '@angular/core';

// Services
import { DesignService } from 'app/main/services/design-service.service';


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


	thisValue : number=5;

	@Input('designData') designData:any;
	@Input('versionList') versionList:any;
	@Input('versionData') versionData:any;
	@Input('userData') userData:any;
	

	constructor( private DesignService : DesignService ) { }


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
    addMyProject( designId ) {
    	console.log('I should be adding a new design with the ID of '+designId);
    }


    // Convert hex to RGB
    hexToRGB( hexCode ):string {
    	return this.DesignService.hexToRGB( hexCode )
    }


}
