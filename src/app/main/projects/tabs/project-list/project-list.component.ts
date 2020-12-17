
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { makProject } from '../../../models/makProject';


@Component({
  selector: 'mak-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

	@Input('makProjects') makProjects:makProject[];
	@Input('currentProject') currentProject:makProject;
	@Output() setCurrentProject = new EventEmitter();
	@Output() deleteProject = new EventEmitter();

  displayType 		: string = 'list';

  constructor() { }

  ngOnInit(): void {

  }



	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------


  setDisplayType( newType:string )
  {
    this.displayType = newType;
  }

}
