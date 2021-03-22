import { Component, OnInit, Input } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';
import { UserData } from 'src/app/main/models/userData';

import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'mak-buttons-list',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  @Input() makDesign:makDesign;
  @Input() userData:UserData;

  constructor( private ProjectsService : ProjectsService ) { }

  ngOnInit(): void {
  }


  // -----------------------------------------------------------------------------------------------------
	// @ FUNCTIONS
	// -----------------------------------------------------------------------------------------------------

	//Create
	addProject( ){
		this.ProjectsService.createProject( this.makDesign, 'default' );
	}

}
