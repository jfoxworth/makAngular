
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { makProject } from '../../../models/makProject';

@Component({
  selector: 'mak-project-list-card',
  templateUrl: './project-list-card.component.html',
  styleUrls: ['./project-list-card.component.scss']
})
export class ProjectListCardComponent implements OnInit {

	@Input('makProjects') makProjects:makProject[];
	@Input('currentProject') currentProject:makProject;
	@Output() setCurrentProject = new EventEmitter();
	@Output() deleteProject = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
