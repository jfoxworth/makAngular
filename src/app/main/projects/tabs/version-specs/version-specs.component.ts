


// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makVersion } from '../../../models/makVersion';

// Services
import { VersionsService } from '../../../services/versions.service';

@Component({
  selector: 'mak-version-specs',
  templateUrl: './version-specs.component.html',
  styleUrls: ['./version-specs.component.scss']
})
export class VersionSpecsComponent implements OnInit {

	@Input('currentVersion') currentVersion:makVersion;
	@Output() displayMessage = new EventEmitter();
  versionChangesExist : boolean = false;

  constructor( private VersionsService : VersionsService)
  { }

  ngOnInit(): void {
  }

  saveVersion( )
	{
		this.VersionsService.updateVersion( this.currentVersion );
    this.displayMessage.emit({text:'Version Saved'});
	}

}
