
/*


	This is the component file for the creator studio. The studio has six or seven
	tabs and is where a user sets up the menu for the design studio as well as the
	appearance of the design on the market place.

	As with other components, the data for the designs, the signoffs, and other
	items are brought in through observables from firebase.


*/


// Standard Angular Items
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';

// RXJS Items
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { concatMap, delay, filter, first, map, mergeMap, shareReplay, tap, withLatestFrom } from 'rxjs/operators';

// Angular Material Items
import { MatSnackBar } from '@angular/material/snack-bar';

// Drag Drop Items
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// NGRX Items
import { Store } from "@ngrx/store";
import { DesignState } from '../store/reducers';

// Services
import { UserService } from '../services/user.service';
import { CreatorStudioService } from '../services/creator-studio.service';
import { DesignsService } from '../services/designs.service';
import { SignoffReqsService } from '../services/signoff-reqs.service';
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { signoffReqEntityService } from '../services/entity/signoffReq-entity.service';
import { MarketplaceService } from '../services/marketplace.service';

// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';

// Models
import { makDesign } from '../models/makDesign';
import { signoffReq } from '../models/signoffReq';
import { UserData } from '../models/userData';





export interface DialogData {
  i:number;
  j:number;
  parameterTypes:string[]
  iconOptions:string[],
  parameterUrls: any;
  currentDesign: makDesign;
}




@Component({
  selector: 'mak-creator-studio',
  templateUrl: './creator-studio.component.html',
  styleUrls: ['./creator-studio.component.scss',
  			  '../projects/projects.component.scss',
  			  '../marketplace/product/product.component.scss',
  			  '../design-studio/sidebar/sidebar.component.scss',
  			  '../design-studio/slider.component.scss']
})
export class CreatorStudioComponent implements OnInit {

	userData 			    : any;
	designTemplate 		: any;
	parameterTemplate : any;
	companies 			  : any;
	menuLocations 		: any;
	dataFlag 			    : boolean = false;
	dataFlag2 			  : boolean = false;
	changesExist 		  : boolean = false;
	makDesigns$ 		  : Observable<makDesign[]>;
	signoffReqs$ 		  : Observable<signoffReq[]>;
  signoffs 			    : string[];
  currentId         : string;
  images            : any[];

	// Variables needed for the BG image
	imageUrls : Array<any> = [];
	parameterUrls : Array<any> = [];

	private _unsubscribeAll: Subject<any>;


  constructor(	private UserService           : UserService,
                private CreatorStudioService 	: CreatorStudioService,
                private MarketplaceService    : MarketplaceService,
                private DesignsService 			  : DesignsService,
                private SignoffReqsService 		: SignoffReqsService,
                private SnackBar 				      : MatSnackBar,
                private afStorage 				    : AngularFireStorage,
                private DesignEntityService 	: makDesignEntityService,
                private SignoffEntityService 	: signoffReqEntityService,
                public vcRef 					        : ViewContainerRef,
                private designStore           : Store<DesignState>, )
	{
		this._unsubscribeAll = new Subject();
	}










	ngOnInit(): void {

    this.UserService.userObject
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user)=>{ this.userData = <UserData>user; });


		// Get the lists of things needed from the service
		this.menuLocations	= this.CreatorStudioService.getMenuLocations();



		// The observable for the signoff reqs from the store
		this.signoffReqs$ = this.SignoffEntityService.entities$
			.pipe(
				tap((signoffReqs) => {
					this.signoffs = [];
					signoffReqs.forEach((ts)=>{ this.signoffs.push(ts['designId']); })
				})
			)
		this.signoffReqs$.subscribe();



		// The observable for the design data from the store
		this.makDesigns$ = this.DesignEntityService.entities$
		.pipe(
			map(makDesigns => makDesigns.filter(makDesign => makDesign.creatorId == this.userData.uid))
    );
		this.makDesigns$.subscribe((makDesigns)=>{
      (this.currentId===undefined && makDesigns.length>0) ? this.setCurrent(makDesigns[0]):'';
      makDesigns.length==0 ? this.currentId='':'';
    });



	}





	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------


	setCurrent(design:makDesign) {
    this.designStore.subscribe(state => {
      this.images = this.MarketplaceService.getProductImages(design.id, state.designs.designs);
    });
		this.currentId=design.id;
		console.log();

  }

  getCurrentDesign(id:string, designs:makDesign[]):makDesign
  {
    return designs.find(des=>des.id==id)
  }

	updateDesign( changeObj:makDesign )
	{
		this.DesignsService.updateDesign( changeObj );
		this.displayMessage({text:'Design is updated'});
  }

  displayMessage( message )
	{
    this.SnackBar.open(message.text,'', {duration: 4000});
	}

	deleteDesign( designId )
	{
		this.DesignsService.deleteDesign( designId );
	}

}


