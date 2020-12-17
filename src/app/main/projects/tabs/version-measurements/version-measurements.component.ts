
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makVersion } from '../../../models/makVersion';

@Component({
  selector: 'mak-version-measurements',
  templateUrl: './version-measurements.component.html',
  styleUrls: ['./version-measurements.component.scss']
})
export class VersionMeasurementsComponent implements OnInit {

  versionChangesExist : boolean = false;
	columnsToDisplayMeas = ['name', 'value'];

  @Input('currentVersion') currentVersion:makVersion;
	@Output() saveVersion = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

}
