// Core items
import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { UserData } from '../../../models/userData';
import { makDesign } from '../../../models/makDesign';
import { makVersion } from '../../../models/makVersion';

// Services
import { ProjectsService } from '../../../services/projects.service';


@Component({
  selector: 'mak-design-cost',
  templateUrl: './design-cost.component.html',
  styleUrls: ['./design-cost.component.scss']
})
export class DesignCostComponent implements OnInit {

	@Input('userData') userData:UserData;
	@Input('designData') designData:makDesign;
	@Input('versionData') versionData:makVersion;

  constructor( private ProjectsService : ProjectsService,
               private router	: Router ) { }

  ngOnInit(): void {
  }

  // When a user wants to add a new project based upon a design
  addMyProject( ) {
    this.ProjectsService.createProject( this.designData, this.versionData  );
    this.router.navigateByUrl('/projects');
    }



}
