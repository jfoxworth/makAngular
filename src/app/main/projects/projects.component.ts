
/*
*
*
*	The component class tries to stick to the idea of skinny controllers/components
*	and fat services. On initialization, observers are created for the data needed
*	and the service is called to set the items needed.
*
*
*/


// Standard Angular Items
import { Component, OnInit } from '@angular/core';

// Angular Material Items
import { MatSnackBar } from '@angular/material/snack-bar';

// RXJS Items
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { ProjectsService } from '../services/projects.service';
import { UserService } from '../services/user.service';
import { DesignsService } from '../services/designs.service';
import { VersionsService } from '../services/versions.service';

import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { makVersionEntityService } from '../services/entity/makVersion-entity.service';
import { makProjectEntityService } from '../services/entity/makProject-entity.service';

// Models
import { makDesign } from '../models/makDesign';
import { makProject } from '../models/makProject';
import { makVersion } from '../models/makVersion';
import { UserData } from '../models/userData';

// Firestore Items
import { AngularFirestore } from '@angular/fire/firestore';

// NGRX Items
import { Store } from "@ngrx/store";
import { AuthState } from '../../main/store/reducers';



@Component({
	selector	 : 'products',
	templateUrl  : './projects.component.html',
  styleUrls: ['../creator-studio/creator-studio.component.scss',
  			  './projects.component.scss',
  			  '../marketplace/product/product.component.scss',
  			  '../design-studio/sidebar/sidebar.component.scss',
  			  '../design-studio/slider.component.scss']
})
export class ProjectsComponent implements OnInit
{

	projectList 		  : makProject[];
	versionList 		  : makVersion[];
	currentProject 		: makProject;
	currentVersion 		: makVersion;
  currentDesign 		: makDesign;
  currentDesignId   : string;
  currentProjectId  : string;
  currentVersionId  : string;
	userData 			    : UserData;
	designImageUrl 		: any;
	projectStages 		: string[];
	projectStatus 		: boolean[];
	selectedStatus 		: boolean[];
	stageTexts 			  : any[];

	changesExist 		  : boolean = false;
	versionChangesExist : boolean = false;

	projectDataFlag 	: boolean = false;
	versionDataFlag 	: boolean = false;
	designDataFlag 		: boolean = false;

	makDesigns$ 		  : Observable<makDesign[]>;
	makProjects$ 		  : Observable<makProject[]>;
	makVersions$ 		  : Observable<makVersion[]>;
	images 				    : never[];
  private _unsubscribeAll: Subject<any>;


	constructor(
    private ProjectsService			  : ProjectsService,
    private DesignsService        : DesignsService,
    private VersionsService       : VersionsService,
    private UserService           : UserService,
		public  afs 						      : AngularFirestore,
		private SnackBar 				      : MatSnackBar,
		private DesignEntityService 	: makDesignEntityService,
		private ProjectEntityService 	: makProjectEntityService,
		private VersionEntityService 	: makVersionEntityService,
	)
	{
    this._unsubscribeAll = new Subject();
	}


	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void
	{

    // Get the user data
    this.UserService.userObject
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user)=>{ this.userData = <UserData>user; });

		// Get the product stages
		this.projectStages = this.ProjectsService.getProductStages();

		// Get the product status
		this.projectStatus = this.ProjectsService.getInitialStageStatus();

		// Set the product status
		this.selectedStatus = this.ProjectsService.getInitialSelectedStatus();

		// Get the status texts
		this.stageTexts = this.ProjectsService.getStageTexts();

		// The observable for the design data from the store
		this.makDesigns$ = this.DesignEntityService.entities$;

		// The observable for the projects for this design
		this.makProjects$ = this.ProjectEntityService.entities$

		// The observable for the projects for this design
		this.makVersions$ = this.VersionEntityService.entities$


  }



	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------


	displayMessage( message )
	{
    this.SnackBar.open(message.text,'', {duration: 4000});
	}

	updateDesign( changeObj:makDesign )
	{
		this.DesignsService.updateDesign( changeObj );
		this.displayMessage({text:'Design is updated'});
  }

	updateProject( changeObj:makProject )
	{
		this.ProjectsService.updateProject( changeObj );
    this.displayMessage({text:'Project is updated'});
	}

	updateVersion( changeObj:makVersion )
	{
		this.VersionsService.updateVersion( changeObj );
    this.displayMessage({text:'Version is updated'});
	}

  deleteProject( project:makProject )
	{
    this.ProjectsService.deleteProject( project.id );
    this.displayMessage({text:'Project Deleted'});
	}



	// -----------------------------------------------------------------------------------------------------
	//
	// @ USER CLICK ACTIONS
	//
	// -----------------------------------------------------------------------------------------------------

	/**
	 *  	Set the current project to the one given
	 */
	setCurrentProject( project:makProject )
	{
    this.currentProjectId = project.id;
	}

  getCurrentDesign(id:string, designs:makDesign[]):makDesign
  {
    return designs.find(des=>des.id==id)
  }

  getCurrentProject(id:string, projects:makProject[]):makProject
  {
    return projects.find(pro=>pro.id==id)
  }





}

