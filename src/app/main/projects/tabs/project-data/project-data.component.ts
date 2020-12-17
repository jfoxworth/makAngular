
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  saveNameChange(event){
		this.updateProject.emit( {...this.currentProject, 'name':event.target.value} );
  }

	saveDescChange( event ){
		this.updateProject.emit( {...this.currentProject, 'description':event.target.value} );
  }

}
