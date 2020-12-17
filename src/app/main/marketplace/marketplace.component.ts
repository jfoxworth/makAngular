
// Core Angular Items
import { Component, OnInit } from '@angular/core';

// RxJS
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

// NGRX Items
import { Store } from "@ngrx/store";
import { DesignState } from '../store/reducers';

// Models
import { makDesign } from '../models/makDesign';
import { signoffReq } from '../models/signoffReq';

// Services
import { UserService } from '../services/user.service';
import { CreatorStudioService } from '../services/creator-studio.service';
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { signoffReqEntityService } from '../services/entity/signoffReq-entity.service';
import { UserData } from '../models/userData';



@Component({
  selector: 'mak-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  makDesigns$ 		: Observable<makDesign[]>;
  signoffReqs$ 		: Observable<signoffReq[]>;
  designTypes 		: string[];
	signoffs 				: string[];
	images 					: never[];
  selectedType 		: string = "All";
  userData        : UserData;
  private _unsubscribeAll: Subject<any>;


  constructor( private designStore : Store<DesignState>,
               private CreatorStudioService : CreatorStudioService,
               private DesignEntityService : makDesignEntityService,
               private SignoffEntityService : signoffReqEntityService,
               private UserService : UserService )
  {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {


    // Get the user data
    this.UserService.userObject
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user)=>{ this.userData = <UserData>user; });


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

