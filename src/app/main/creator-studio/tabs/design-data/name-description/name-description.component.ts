

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makDesign } from 'src/app/main/models/makDesign';

// Form Items
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NameCheckValidators } from 'src/app/main/Common/Validators/namecheck.validators';


@Component({
  selector: 'mak-design-data-nd',
  templateUrl: './name-description.component.html',
  styleUrls: ['./name-description.component.scss']
})
export class NameDescriptionComponent implements OnInit {


  @Input('currentDesign') currentDesign:makDesign;
	@Output() updateDesign = new EventEmitter();

  dataform : FormGroup;

  get title(){
    return this.dataform.get('designTitle');
  }

  get desc(){
    return this.dataform.get('designDesc');
  }

  constructor( ) { }

  ngOnInit(): void {

    this.dataform = new FormGroup({
      'designTitle' : new FormControl(this.currentDesign.title, [Validators.required, 
                                                                Validators.minLength(5),
                                                                NameCheckValidators.cannotContainSpecialChars ]),
  
      'designDesc' : new FormControl(this.currentDesign.description, [Validators.required, 
                                                                      Validators.minLength(25),
                                                                      NameCheckValidators.cannotContainSomeSpecialChars])
    });

  }


	saveNameChange( event:FocusEvent )
	{
    this.dataform.controls.projectName.status=="VALID" ? 
      this.updateDesign.emit( {...this.currentDesign, 'title':(<HTMLInputElement>event.target).value} ) : '';
  }

	saveDescChange( event:FocusEvent )
	{
    this.dataform.controls.projectName.status=="VALID" ? 
      this.updateDesign.emit( {...this.currentDesign, 'description':(<HTMLInputElement>event.target).value} ) : '';
  }

}
