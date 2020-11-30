


// Common Angular Items
import { Component, OnInit } from '@angular/core';



// RXJS Items
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import { takeUntil } from 'rxjs/internal/operators';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';


// Angular Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';




// Services
import { CreatorStudioService } from 'app/main/services/creator-studio.service';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { DesignsService } from 'app/main/services/designs.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';
import { DesignSignoffsService } from 'app/main/services/design-signoffs.service';

import { makDesignEntityService } from 'app/main/services/entity/makDesign-entity.service';
import { signoffReqEntityService } from 'app/main/services/entity/signoffReq-entity.service';





// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';
import { signoffReq } from 'app/main/models/signoffReq';
import { designSignoff } from 'app/main/models/designSignoffs';
import { imageObj } from 'app/main/models/imageObj';




// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';



// NGRX Items
import { Store } from "@ngrx/store";
import { AppState } from 'app/main/reducers';
import { DesignState } from 'app/main/reducers';
import { designImagesSave } from 'app/main/actions/design.actions';
import { designImagesReducer } from 'app/main/reducers/index';
import { DesignActions } from 'app/main/actions/designAction-types';




@Component({
	selector: 'app-marketplace',
	templateUrl: './marketplace.component.html',
	styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {


	makDesigns$ 	: Observable<makDesign[]>;
	signoffReqs$ 	: Observable<signoffReq[]>;
	marketplaceList : makDesign[];
	currentItem 	: makDesign;
	selectedType 	: string = "All";
	designTypes 	: string[];
	userData 		: any;
	signoffReqs 	: designSignoff[];
	signoffs 		: string[];
	newArr 			: imageObj[];
	images 			: never[];

	private _unsubscribeAll: Subject<any>;




	constructor(	private CreatorStudioService 		: CreatorStudioService,
					private MarketplaceService 			: MarketplaceService,
					private DesignsService 				: DesignsService,
					private SignoffReqsService 			: SignoffReqsService,
					private DesignSignoffsService 		: DesignSignoffsService,
					private SnackBar 					: MatSnackBar,
					private afStorage 					: AngularFireStorage,
					private DesignEntityService 		: makDesignEntityService,
					private SignoffEntityService 		: signoffReqEntityService,
					private store 						: Store<AppState>,
					private designStore 				: Store<DesignState>
		) { 

		// Get the user data
		this.userData = JSON.parse(localStorage.getItem('user'));
		this._unsubscribeAll = new Subject();
	}

	

	ngOnInit(): void {


		// Get the design types
		this.designTypes=this.CreatorStudioService.getDesignTypes();
		this.designTypes.unshift("All");


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
		this.makDesigns$ = this.DesignEntityService.entities$



		// Listen to the images observable
		this.designStore.subscribe(state => {
			
			if (state.designs.designs.type)
			{
				let temp = JSON.parse(JSON.stringify(state.designs.designs));
				delete temp.type
				this.images = Object.values(temp);
			}else
			{
				this.images = Object.values(state.designs.designs);					
			}
			
		});





	}










}
