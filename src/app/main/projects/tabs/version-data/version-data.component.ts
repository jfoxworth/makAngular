
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';

// Models
import { makProject } from '../../../models/makProject';
import { makVersion } from '../../../models/makVersion';

// Angular Material Items
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { VersionsService } from '../../../services/versions.service';


@Component({
  selector: 'mak-version-data',
  templateUrl: './version-data.component.html',
  styleUrls: ['./version-data.component.scss']
})
export class VersionDataComponent implements OnInit {

	@Input('currentDesign') currentDesign:makDesign;
	@Input('currentProject') currentProject:makProject;
	@Input('currentVersion') currentVersion:makVersion;
  @Input('makVersions') makVersions:makVersion[];
	@Output() displayMessage = new EventEmitter();


  constructor(
                private VersionsService : VersionsService,
                private MatSnackBar     : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

	setCurrentVersion( $event:makVersion): void
	{
		this.currentVersion = JSON.parse(JSON.stringify($event));
		this.currentVersion.measurements = [];
		for (const property in this.currentVersion.values) {
			this.currentVersion.measurements.push({'name': property, 'value': this.currentVersion.values[property] });
		}

	}

	createNewVersion( type:string )
	{
    this.VersionsService.createVersion( type, this.currentProject, this.makVersions, this.currentDesign );
    this.MatSnackBar.open('New Version Created','', {duration: 4000});
	}

}
