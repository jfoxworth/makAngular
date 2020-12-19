
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Form Items
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NameCheckValidators } from 'src/app/main/Common/Validators/namecheck.validators';

// Models
import { makProject } from '../../../models/makProject';


@Component({
  selector: 'mak-project-data',
  templateUrl: './project-data.component.html',
  styleUrls: ['./project-data.component.scss']
})
export class ProjectDataComponent implements OnInit {

	@Input('currentProject') currentProject:makProject;
  @Output() updateProject = new EventEmitter();


  dataform : FormGroup;
  
 
  get name(){
    return this.dataform.get('projectName');
  }

  get desc(){
    return this.dataform.get('projectDescription');
  }

  constructor() { 
  }

  ngOnInit(): void {

    this.dataform = new FormGroup({
      'projectName' : new FormControl(this.currentProject.name, [Validators.required, 
                                           Validators.minLength(5),
                                           NameCheckValidators.cannotContainSpecialChars ]),
  
      'projectDescription' : new FormControl(this.currentProject.description, [Validators.required, 
                                                  Validators.minLength(25),
                                                  NameCheckValidators.cannotContainSomeSpecialChars])
    });
  
  }

  saveNameChange( event:FocusEvent ){
    console.log(event);
    console.log(this.dataform);
    this.dataform.controls.projectName.status=="VALID" ? 
      this.updateProject.emit( {...this.currentProject, 'name':(<HTMLInputElement>event.target).value} ) : '';
  }

	saveDescChange( event:FocusEvent ){
    console.log(event);
    console.log(this.dataform);
    this.dataform.controls.projectDescription.status=="VALID" ? 
		  this.updateProject.emit( {...this.currentProject, 'description':(<HTMLTextAreaElement>event.target).value} ) : '';
  }

}
