
/*

	This is the component for viewing a single design project. The user
	is able to create a project or view the design in the design center

*/


// Common Angular Items
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



// RXJS Items
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { concatMap, delay, filter, first, map, mergeMap, shareReplay, tap, withLatestFrom } from 'rxjs/operators';



// Angular Material Items
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';


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
import { makDesignEntityService } from 'app/main/services/entity/makDesign-entity.service';
import { signoffReqEntityService } from 'app/main/services/entity/signoffReq-entity.service';
import { makProjectEntityService } from 'app/main/services/entity/makProject-entity.service';

import { AngularFireStorage } from '@angular/fire/storage';




// NGRX Items
import { Store } from "@ngrx/store";
import { AppState } from 'app/main/reducers';
import { DesignState } from 'app/main/reducers';






@Component({
  selector: 'marketplace-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class MarketplaceProductComponent implements OnInit {

	public id 				: string;
	public marketplaceItem 	: makDesign;
	dataFlag 				: boolean = false;
	projectDataFlag 		: boolean = false;
	projectList 			: makProject[];
	signoffList 			: signoffReq[];
	userData 				: any;
	private _unsubscribeAll : Subject<any>;
	makDesign$ 				: Observable<makDesign>;
	signoffReqs$ 			: Observable<signoffReq[]>;
	makProjects$ 			: Observable<makProject[]>;
	signoffs 				: string[];
	images 					: never[];


	constructor(private route 					: ActivatedRoute,
				private DesignsService 			: DesignsService,
				private ProjectsService 		: ProjectsService,
				private SignoffReqsService		: SignoffReqsService,
				private afStorage 				: AngularFireStorage,
				private MarketplaceService 		: MarketplaceService,
				private DesignEntityService 	: makDesignEntityService,
				private ProjectEntityService 	: makProjectEntityService,
				private SignoffEntityService 	: signoffReqEntityService,
				private store 					: Store<AppState>,
				private designStore 			: Store<DesignState>)
	{
		this._unsubscribeAll = new Subject();		
	}

	ngOnInit(): void {

		this.userData = JSON.parse(localStorage.getItem('user'));

		// Get the ID of the product being viewed
		this.id = this.route.snapshot.paramMap.get('itemId');


		// The observable for the signoff reqs from the store
		this.signoffReqs$ = this.SignoffEntityService.entities$
			.pipe(
				tap((signoffReqs) => {
					// This needs to call a function that gets the images and stores their addresses
					this.signoffs = [];
					for (let a=0; a<signoffReqs.length; a++)
					{
						this.signoffs.push(signoffReqs[a]['designId']);
					}
				})
			)
		this.signoffReqs$.subscribe();




		// The observable for the design data from the store
		this.makDesign$ = this.DesignEntityService.entities$
		.pipe(
			mergeMap(makDesigns => makDesigns.filter(makDesign => makDesign.id == this.id))
		);



		// The observable for the projects for this design
		this.makProjects$ = this.ProjectEntityService.entities$
		.pipe(
			map(makProjects => makProjects.filter(makProject => makProject.designId == this.id))
		);


		// Listen to the images observable
		this.designStore.subscribe(state => {

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

				for (let a=0; a<this.images.length; a++)
				{
					if ( this.images[a]['itemId'] != this.id )
					{
						this.images.splice(a,1);
						a=a-1;				
					}
				}
		});



	}





	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR A PROJECT
	//
	// -----------------------------------------------------------------------------------------------------


	//Create
	addProject( ){
		this.ProjectsService.createProject( this.marketplaceItem, '' );
	}





















}
