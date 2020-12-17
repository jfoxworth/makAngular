

// Core items
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

// Models
import { makVersion } from '../../../models/makVersion';
import { makProject } from '../../../models/makProject';
import { makDesign } from '../../../models/makDesign';

// Services
import { VersionsService } from '../../../services/versions.service';



@Component({
  selector: 'mak-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.scss']
})
export class VersionListComponent implements OnInit {

  @Input('versionList') versionList:makVersion[];
  @Input('projectData') projectData:makProject;
  @Input('designData') designData:makDesign;
	@Output() setVersionData = new EventEmitter();


  versionData:makVersion;
  editableVersion:boolean=false;

  constructor( private VersionsService 			: VersionsService ) { }


  ngOnInit(): void {
  }



	/*
	*
	* When a new version is to be created
	*
	*/
	createNewVersion( )
	{
		console.log('Creating new version ');
		this.VersionsService.createVersion( '', this.projectData, this.versionData, this.designData )
	}



}
