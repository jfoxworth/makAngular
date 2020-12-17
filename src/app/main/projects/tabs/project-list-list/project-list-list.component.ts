
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { makProject } from '../../../models/makProject';


@Component({
  selector: 'mak-project-list-list',
  templateUrl: './project-list-list.component.html',
  styleUrls: ['./project-list-list.component.scss']
})
export class ProjectListListComponent implements OnInit {

  @Input('makProjects') makProjects:makProject[];
	@Input('currentProject') currentProject:makProject;
	@Output() setCurrentProject = new EventEmitter();
	@Output() deleteProject = new EventEmitter();


  constructor() { }



  ngOnInit(): void {

  }

}
