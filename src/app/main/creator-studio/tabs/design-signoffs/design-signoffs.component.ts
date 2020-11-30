

// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Services
import { UserService } from 'app/main/services/user-service.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';


// Models
import { makDesign } from 'app/main/models/makDesign';
import { signoffReq } from 'app/main/models/signoffReq';



// RXJS Items
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { concatMap, delay, filter, first, map, mergeMap, shareReplay, tap, withLatestFrom } from 'rxjs/operators';




@Component({
  selector: 'mak-design-signoffs',
  templateUrl: './design-signoffs.component.html',
  styleUrls: ['./design-signoffs.component.scss']
})
export class DesignSignoffsComponent implements OnInit {


	@Input('currentDesign') currentDesign:makDesign;
	@Input('userData') userData:any;


  potentialUser 	        : any = {};
	testUser 			          : string;
	reqList 	  		        : signoffReq[];
	private _unsubscribeAll : Subject<any>;



  constructor(
              private UserService 			    : UserService,
              private SignoffReqsService 		: SignoffReqsService,

  ) { }

  ngOnInit(): void {
  }






	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS RELATING TO THE SIGNOFFS
	//
	// -----------------------------------------------------------------------------------------------------

	// Check if a user or team name is valid
	checkUserEmail( name )
	{
		console.log(name);

		this.UserService.checkUserEmail( name )
		.subscribe(result=> {
			console.log(result.docs);

			if ( result.docs.length>0 )
			{ 
				this.potentialUser = result.docs[0].data();

			}else
			{
				this.potentialUser = {};
			}
		});

	}



	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR A DESIGN REQ
	//
	// -----------------------------------------------------------------------------------------------------

	// Create
	createDesignReq( userObj ): void
	{
		this.SignoffReqsService.createSignoffReq( userObj, this.currentDesign );
		this.potentialUser = {};
	}


	// Read
	subscribeToSignOffData()
	{

		// Subscribe to the designs for the user
		this.SignoffReqsService.signoffReqStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((reqs)=>
		{ 

			if ( reqs.length > 0 )
			{
				for (let a=0; a<reqs.length; a++)
				{
					this.UserService.fetchUserData( reqs[a].userId )
						.subscribe(result=> {
							reqs[a]['userImage'] = this.UserService.getProfileImage( result.docs[0].data() );
						});

				}
			}
			this.reqList = reqs;
		});

	}




}
