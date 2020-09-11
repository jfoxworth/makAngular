
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




// Services
import { ProjectsService } from 'app/main/services/projects.service';
import { DesignsService } from 'app/main/services/designs.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MarketplaceService } from 'app/main/services/marketplace.service';





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
	userData 			: any;
	private _unsubscribeAll: Subject<any>;


	constructor(private route 				: ActivatedRoute,
				private FirebaseService 	: FirebaseService,
				private DesignsService 		: DesignsService,
				private ProjectsService 	: ProjectsService,
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

		/*
		this.FirebaseService.getDocById( 'designs', this.id )
			.then((snapshot) => {
				this.storeItem = snapshot.data();
				//console.log(snapshot.data());
				this.formatData();
				this.dataFlag=true;
			})
			.catch((err) => {
			  console.log('Error getting documents', err);
		});
		*/


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
