
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
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';



// Angular Material Items
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';




// RXJS Items
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/internal/operators';
import { finalize } from 'rxjs/operators';
import { concatMap, delay, filter, first, shareReplay, tap, withLatestFrom } from 'rxjs/operators';


// Fuse Specific Items
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';



// Services
import { EcommerceService } from 'app/main/services/e-commerce.service';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { VersionsService } from 'app/main/services/versions.service';
import { ProjectsService } from 'app/main/services/projects.service';
import { DesignsService } from 'app/main/services/designs.service';

import { makDesignEntityService } from 'app/main/services/entity/makDesign-entity.service';
import { makVersionEntityService } from 'app/main/services/entity/makVersion-entity.service';
import { makProjectEntityService } from 'app/main/services/entity/makProject-entity.service';



// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';




// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';




// NGRX Items
import { Store } from "@ngrx/store";
import { AppState } from 'app/main/reducers';
import { DesignState } from 'app/main/reducers';
import { designImagesSave } from 'app/main/actions/design.actions';
import { designImagesReducer } from 'app/main/reducers/index';
import { DesignActions } from 'app/main/actions/designAction-types';


//import { DataSource } from '@angular/cdk/collections';


@Component({
	selector	 : 'products',
	templateUrl  : './e-commerce.component.html',
	styleUrls	: ['./e-commerce.component.scss'],
	animations   : fuseAnimations,
	encapsulation: ViewEncapsulation.None
})
export class EcommerceComponent implements OnInit
{

	projectList 		: makProject[];
	versionList 		: makVersion[];
	columnsToDisplayMeas = ['name', 'value'];
	currentProject 		: makProject;
	currentVersion 		: makVersion;
	currentDesign 		: makDesign; 
	userData 			: any;
	designImageUrl 		: any;
	projectStages 		: string[];
	projectStatus 		: boolean[];
	selectedStatus 		: boolean[];
	stageTexts 			: any[];
	displayType 		: string = 'list';

	changesExist 		: boolean = false;
	versionChangesExist : boolean = false;

	projectDataFlag 	: boolean = false;
	versionDataFlag 	: boolean = false;
	designDataFlag 		: boolean = false;

	makDesigns$ 		: Observable<makDesign[]>;
	makProjects$ 		: Observable<makProject[]>;
	makVersions$ 		: Observable<makVersion[]>;
	images 				: never[];



	// Private
	private _unsubscribeAll: Subject<any>;

	constructor(
		private EcommerceService		: EcommerceService,
		private VersionsService			: VersionsService,
		private ProjectsService			: ProjectsService,
		private DesignsService			: DesignsService,
		private MarketplaceService 		: MarketplaceService,
		public afs 						: AngularFirestore,
		private SnackBar 				: MatSnackBar,
		private afStorage  				: AngularFireStorage,
		private DesignEntityService 	: makDesignEntityService,
		private ProjectEntityService 	: makProjectEntityService,
		private VersionEntityService 	: makVersionEntityService,
		private designStore 			: Store<DesignState>
	)
	{
		// Set the private defaults
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
		

		// Scrape the user data
		this.userData = JSON.parse(localStorage.getItem('user'));
		if ( ( this.userData === null ) || ( this.userData ===undefined ) )
		{
			this.userData = {};
		}


		// Get the product stages
		this.projectStages = this.EcommerceService.getProductStages();

		// Get the product status
		this.projectStatus = this.EcommerceService.getInitialStageStatus();

		// Set the product status
		this.selectedStatus = this.EcommerceService.getInitialSelectedStatus();

		// Get the status texts
		this.stageTexts = this.EcommerceService.getStageTexts();

		// The observable for the design data from the store
		this.makDesigns$ = this.DesignEntityService.entities$;

		// The observable for the projects for this design
		this.makProjects$ = this.ProjectEntityService.entities$

		// The observable for the projects for this design
		this.makVersions$ = this.VersionEntityService.entities$


		// Listen to the images observable
		this.designStore.subscribe(state => {

			console.log(state);
				if (state.designs.designs.type)
				{
					let temp = JSON.parse(JSON.stringify(state.designs.designs));
					delete temp.type
					this.images = Object.values(temp);				
				}else
				{
					let temp = JSON.parse(JSON.stringify(state.designs.designs));
					this.images = Object.values(temp);
				}

				console.log(this.images);
		});
	}




	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------









	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR VERSIONS
	//
	// -----------------------------------------------------------------------------------------------------


	// Create
	createNewVersion( type ) 
	{
		this.VersionsService.createVersion( type, this.currentProject, this.versionList, this.currentDesign );
		this.SnackBar.open('New version created','', {duration: 4000});
	}




	// Update Version
	saveVersion( ) 
	{
		console.log('Saving version '+this.currentVersion.id);
		this.VersionsService.updateVersion( this.currentVersion );
		//this.FirebaseService.updateDocDataUsingId('versions', this.currentVersion.uid, this.currentVersion );
		this.SnackBar.open('Version Saved','', {duration: 4000});
	}

	// Update Project
	saveProject( ) 
	{
		console.log('Saving project ');
		this.ProjectsService.updateProject( this.currentProject );
		//this.FirebaseService.updateDocDataUsingId('projects', this.currentProject.uid, this.currentProject );
		this.SnackBar.open('Project Saved','', {duration: 4000});

	}


	// Delete Project
	deleteProject( projectId ) 
	{
		this.ProjectsService.deleteProject( projectId );
		this.SnackBar.open('Project Deleted','', {duration: 4000});

	}















	// -----------------------------------------------------------------------------------------------------
	//
	// @ USER CLICK ACTIONS
	//
	// -----------------------------------------------------------------------------------------------------



	/**
	 * 		When a version is selected
	 */
	onVersionSelected( versionIndex : number): void
	{

		this.currentVersion = JSON.parse(JSON.stringify(this.versionList[versionIndex]));
		this.currentVersion.measurements = [];
		for (const property in this.currentVersion.values) {
			this.currentVersion.measurements.push({'name': property, 'value': this.currentVersion.values[property] });
		}

	}


	/**
	 *  	Set the current project to the one given
	 */
	setCurrentProject( project : makProject )
	{

		this.currentProject = JSON.parse(JSON.stringify(project)); 
		//this.VersionsService.getVersionsForProject( project.id ); 
		//this.DesignsService.getDesignById( project.designId );
	}



	/**
	 *  	Set the selected Item
	 */
	setSelected( num:number ): void
	{
		for (var a=0; a<this.selectedStatus.length; a++)
		{
			if ( a == num )
			{
				this.selectedStatus[a]=true;
			}else
			{
				this.selectedStatus[a]=false;				
			}
		}
	}





}

