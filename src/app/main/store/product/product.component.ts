
// Common Angular Items
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



// RXJS Items
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';



// Angular Material Items
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';



// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';
import { designSignoff } from 'app/main/models/designSignoffs';
import { signoffReq } from 'app/main/models/signoffReq';




// Services
import { ProjectsService } from 'app/main/services/projects.service';
import { DesignsService } from 'app/main/services/designs.service';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';
import { DesignSignoffsService } from 'app/main/services/design-signoffs.service';

import { AngularFireStorage } from '@angular/fire/storage';







@Component({
  selector: 'store-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class StoreProductComponent implements OnInit {

	public id 			: string;
	public storeItem 	: makDesign;
	dataFlag 			: boolean = false;
	projectDataFlag 	: boolean = false;
	projectList 		: makProject[];
	signoffList 		: signoffReq[];
	userData 			: any;
	private _unsubscribeAll: Subject<any>;


	constructor(private route 				: ActivatedRoute,
				private DesignsService 		: DesignsService,
				private ProjectsService 	: ProjectsService,
				private SignoffReqsService	: SignoffReqsService,
				private afStorage 			: AngularFireStorage,
				private MarketplaceService 	: MarketplaceService ) 
	{
		this._unsubscribeAll = new Subject();		
	}

	ngOnInit(): void {

		this.userData = JSON.parse(localStorage.getItem('user'));

		// Get the ID of the product being viewed
		this.id = this.route.snapshot.paramMap.get('itemId');


		// Subscribe to observers
		this.subscribeToData();
			
		// Get the design data
		this.DesignsService.getDesignById( this.id );


		// Get the projects that this user has with this design
		if ( ( this.userData !== null ) && ( this.userData !== undefined ) )
		{
			this.ProjectsService.getProjectsForUserDesign( this.userData.uid, this.id )
			//this.projectList = this.FirebaseService.getCollectionTwoParams('projects', 'creatorId', this.userData.uid, 'designId', this.id);
		}else
		{
			this.projectList = [];
		}


	}





	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR A PROJECT
	//
	// -----------------------------------------------------------------------------------------------------


	//Create
	addProject( projectObj ){
		this.ProjectsService.createProject( projectObj, this.storeItem );
	}


	// Read
	subscribeToData()
	{

		// Subscribe to the design
		this.DesignsService.designStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((design)=>
		{ 
			if ( design.category )
			{
				this.storeItem = design;
				this.formatData();
				this.dataFlag=true;

				// Trigger the function to see if the user has any signoff chances
				if ( this.userData )
				{
					this.SignoffReqsService.getSignoffReqsForDesignUser( this.userData.uid, design.id );
				}else
				{
					this.signoffList = [];
				}

			}

		});



		// Subscribe to the projects for this user and design
		this.ProjectsService.projectUDStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((projects)=>
		{ 
			console.log('Projects');
			console.log(projects);
			if ( projects.length > 0 )
			{
				this.projectList = projects;
				this.projectDataFlag = true;
			}

		});


		// Subscribe to the signoff reqs for this user and design
		this.SignoffReqsService.signoffReqDesignUserStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((signoffs)=>
		{ 
			console.log('signoffs');
			console.log(signoffs);
			this.signoffList = signoffs;

		});



	}









	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTION TO FORMAT THE DATA
	//
	// -----------------------------------------------------------------------------------------------------

	formatData(){

		this.storeItem['imageUrls'] = [];
		for (var a=0; a<this.storeItem.marketplace.images.length; a++)
		{
			const ref = this.afStorage.ref(this.storeItem.marketplace.images[a]['path']);
			this.storeItem['imageUrls'].push(ref.getDownloadURL());

			if (this.storeItem.marketplace.images[a]['mainImage'])
			{
				this.storeItem['background'] = ref.getDownloadURL();
			}
		}


	}









}
