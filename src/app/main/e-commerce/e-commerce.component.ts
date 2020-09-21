
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



// RXJS Items
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/internal/operators';



// Fuse Specific Items
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';



// Services
import { EcommerceService } from 'app/main/services/e-commerce.service';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { VersionsService } from 'app/main/services/versions.service';
import { ProjectsService } from 'app/main/services/projects.service';
import { DesignsService } from 'app/main/services/designs.service';



// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';




// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


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


	// Private
	private _unsubscribeAll: Subject<any>;

	constructor(
		private EcommerceService	: EcommerceService,
		private VersionsService		: VersionsService,
		private ProjectsService		: ProjectsService,
		private DesignsService		: DesignsService,
		private MarketplaceService 	: MarketplaceService,
		public afs 					: AngularFirestore,
		private SnackBar 			: MatSnackBar,
		private afStorage  			: AngularFireStorage,
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

		// Subscribe to the observables for the data
		this.ProjectsService.getProjectsForUser( this.userData.uid ); 
		this.subscribeToData();


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

	// Read
	subscribeToData()
	{
		// Subscribe to the project list for this user
		this.ProjectsService.projectStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((projects)=>
		{ 

			if ( projects.length > 0 )
			{
				this.projectList = projects;
				this.setCurrentProject( this.projectList[0] );
				this.projectDataFlag = true;
				console.log('The project data is ');
				console.log(this.projectList);
			}
		});


		// Subscribe to the version list
		this.VersionsService.versionStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((versions)=>
		{ 

			if ( versions.length > 0 )
			{
				this.versionList = versions;
				this.currentVersion = this.versionList[this.versionList.length-1];
				if ( this.currentVersion ) { this.versionDataFlag = true; }
				console.log('The version data is ');
				console.log(this.versionList);
			}
		});


		// Subscribe to the design
		this.DesignsService.designStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((design)=>
		{ 

			this.currentDesign=design;

			// Get the main background image
			if ( design.marketplace)
			{
				for (var a=0; a<this.currentDesign.marketplace.images.length; a++)
				{
					if ( this.currentDesign.marketplace.images[a]['mainImage'] )
					{
						const ref = this.afStorage.ref(this.currentDesign.marketplace.images[a]['path']);
						this.designImageUrl = ref.getDownloadURL();
					}
				}
			}
		});

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

		this.currentVersion = this.versionList[versionIndex];
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
		console.log('The project I am sending is ...');
		console.log(project);

		this.currentProject = project; 
		this.VersionsService.getVersionsForProject( project.id ); 
		this.DesignsService.getDesignById( project.designId );
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

