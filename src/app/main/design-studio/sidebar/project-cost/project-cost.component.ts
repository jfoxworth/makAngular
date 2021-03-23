
// Core items
import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { makDesign } from '../../../models/makDesign';
import { makVersion } from '../../../models/makVersion';
import { makProject } from '../../../models/makProject';
import { UserData } from '../../../models/userData';


// Services
import { ProjectsService } from '../../../services/projects.service';
import { CreatorStudioService } from '../../../services/creator-studio.service';

// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'mak-project-cost',
  templateUrl: './project-cost.component.html',
  styleUrls: ['./project-cost.component.scss']
})
export class ProjectCostComponent implements OnInit {

	@Input('UserData') UserData:UserData;
	@Input('designData') designData:makDesign;
	@Input('versionData') versionData:makVersion;
	@Input('projectData') projectData:makProject;

  constructor( private router	: Router,
               private afStorage : AngularFireStorage, ) { }

  ngOnInit(): void {
  }


}
