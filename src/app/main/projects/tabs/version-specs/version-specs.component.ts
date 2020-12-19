


// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Form Items
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NameCheckValidators } from 'src/app/main/Common/Validators/namecheck.validators';

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
  
  versionform : FormGroup

  get name(){
    return this.versionform.get('versionName');
  }

  get desc(){
    return this.versionform.get('versionDesc');
  }


  constructor( private VersionsService : VersionsService)
  { }

  ngOnInit(): void {

    if (this.currentVersion)
    {
      this.versionform = new FormGroup({
        'versionName' : new FormControl(this.currentVersion.name, [
                                                  Validators.required,
                                                  Validators.minLength(5),
                                                  Validators.maxLength(150),
                                                  NameCheckValidators.cannotContainSpecialChars]),

        'versionDesc' : new FormControl(this.currentVersion.name, [
                                                  Validators.required,
                                                  Validators.minLength(25),
                                                  Validators.maxLength(500),
                                                  NameCheckValidators.cannotContainSomeSpecialChars])
      })
  
    }
  }

  saveNameChange( event:FocusEvent )
	{
    console.log(event);
    console.log(this.versionform);
    if ( this.versionform.controls.versionName.status=="VALID" )
    {
      this.VersionsService.updateVersion( {...this.currentVersion, 'name': (<HTMLInputElement>event.target).value} );
      this.displayMessage.emit({text:'Version Saved'});
    }
	}

  saveDescChange( event )
	{
    console.log(event);
    console.log(this.versionform);
    if ( this.versionform.controls.versionName.status=="VALID" )
    {
      this.VersionsService.updateVersion( {...this.currentVersion, 'description': (<HTMLInputElement>event.target).value} );
      this.displayMessage.emit({text:'Version Saved'});
    }
	}

}
