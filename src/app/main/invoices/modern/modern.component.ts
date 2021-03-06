

/*
*
*
*	The component simple takes an ID for a version and then pulls
* 	the design and project info and creates an invoice based upon
* 	the data that it gets from there.
*
*/


// Standard Angular Items
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';



// RXJS Items
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';


// Services
import { DesignsService } from '../../services/designs.service';
import { ProjectsService } from '../../services/projects.service';
import { VersionsService } from '../../services/versions.service';



// Models
import { makDesign } from '../../models/makDesign';
import { makProject } from '../../models/makProject';
import { makVersion } from '../../models/makVersion';



@Component({
	selector	 : 'invoice-modern',
	templateUrl  : './modern.component.html',
	styleUrls	: ['./modern.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class InvoiceModernComponent implements OnInit, OnDestroy
{
	invoice: any;

	// Variables
	versionId 		  : string;
	designId 		    : string;
	viewType 		    : string = 'version';
	designDataFlag 	: boolean = false;
	projectDataFlag : boolean = false;
	versionDataFlag : boolean = false;
	versionData 	  : makVersion;
	designData 	  	: makDesign;
	projectData   	: makProject;
	measurements  	: any = [];
	makDesigns$   	: Observable<makDesign[]>;
	makProjects$  	: Observable<makProject[]>;
	makVersions$  	: Observable<makVersion[]>;

	private _unsubscribeAll: Subject<any>;


	/**
	 * Constructor
	 *
	 *
	 */
	constructor(
		private DesignsService 			: DesignsService,
		private ProjectsService 		: ProjectsService,
		private VersionsService 		: VersionsService,
		private route					: ActivatedRoute,
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


		this.versionId = this.route.snapshot.paramMap.get('versionId');

		console.log('Version ID is '+this.versionId);

/*
		if ( this.versionId === 'design' )
		{
			this.designId = this.route.snapshot.paramMap.get('designId');
			this.viewType = 'design';

			this.makDesigns$ = this.DesignEntityService.entities$
			.pipe(
				map(makDesigns => makDesigns.filter(makDesign => makDesign.id == this.designId))
			);

		}else
		{
			// The observable for the version data from the store
			this.makVersions$ = this.VersionEntityService.entities$
			.pipe(
				map(makVersions => makVersions.filter(makVersion => makVersion.id == this.versionId))
			);


		}
*/

		this.subscribeToData();
		this.VersionsService.getVersionById( this.versionId );



	}




	subscribeToData()
	{

		this.VersionsService.versionOneStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((version)=>
		{

			if ( version['designId'] )
			{
				this.versionData = version;
				this.versionDataFlag = true;
				this.DesignsService.getDesignById( version['designId'] );
				this.ProjectsService.getProjectById( version['projectId'] );

				// calculate the costs
				this.calculateCosts();

				// Format the value data
				this.formatValues();

			}
		});



		this.DesignsService.designStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((design)=>
		{

			if ( design )
			{
				this.designData = design;
				this.designDataFlag=true;
			}
		});


		this.ProjectsService.projectOneStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((project)=>
		{

			if ( project )
			{
				this.projectData = project;
				this.projectDataFlag=true;
			}
		});

	}


	/**
	 * On destroy
	 */
	ngOnDestroy(): void
	{
	}




	/**
	*
	* This is a simple function to calculate tax and total
	*
	**/
	calculateCosts():void{

		this.versionData.tax = Math.round(this.versionData.price*0.0825*100) / 100;
		this.versionData.totalCost = Math.round((this.versionData.price+this.versionData.tax)*100)/100;
		this.versionData.deposit = Math.round(this.versionData.totalCost * 0.25*100)/100;

	}




	/**
	*
	* The values object is pushed into an array so that it can be displayed
	*
	**/
	formatValues(){

		this.measurements = [];
		for (const property in this.versionData.values) {

			this.measurements.push({ 'name' : property, 'value' : this.versionData['values'][property]});
  			//console.log(`${property}: ${this.versionData['values'][property]}`);
		}

	}





}
