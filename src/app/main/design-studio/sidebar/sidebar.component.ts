

import { Component, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';

// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';

import { EventEmitter } from '@angular/core';

// Services
import { DesignStudioService } from '../../services/design-studio.service';
import { CreatorStudioService } from '../../services/creator-studio.service';

// Models
import { makDesign } from '../../models/makDesign';
import { makProject } from '../../models/makProject';
import { makVersion } from '../../models/makVersion';
import { designSignoff } from '../../models/designSignoffs';
import { UserData } from '../../models/userData';


@Component({
  selector: 'mak-design-sidebar',
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
	menuLocations : number[][] = this.DesignStudioService.getMenuLocations();
	menuShow 		  : boolean[] = [false, false, false];


	@Input('designData') designData:makDesign;
	@Input('projectData') projectData:makProject;
	@Input('versionData') versionData:makVersion;
	@Input('versionList') versionList:makVersion[];
	@Input('signoffData') signoffData:designSignoff[];
	@Input('userData') userData:UserData;
	@Input('flowersJSON') flowersJSON:any;
	@Input('flowerFlag') flowerFlag:any;
	@Input('editableVersion') editableVersion:boolean;


	constructor(
              private DesignStudioService 	: DesignStudioService,
              private CreatorStudioService  : CreatorStudioService
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

  // Convert hex to RGB
  hexToRGB( hexCode:string ):string {
    return this.CreatorStudioService.hexToRGB( hexCode )
  }

  // Format color to be sent to shapediver
  formatColor( hexCode:string ):string {
    return hexCode.replace('#', '0x')+'AA';
  }


}
