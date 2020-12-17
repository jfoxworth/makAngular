
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makVersion } from '../../../models/makVersion';
import { makProject } from '../../../models/makProject';


@Component({
  selector: 'mak-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.scss']
})
export class VersionListComponent implements OnInit {

	@Input('makVersions') makVersions:makVersion;
	@Input('currentVersion') currentVersion:makVersion;
	@Input('currentProject') currentProject:makProject;
	@Output() createNewVersion = new EventEmitter<object>();
	@Output() setCurrentVersion = new EventEmitter<makVersion>();

  constructor() { }

  ngOnInit(): void {
  }

}
