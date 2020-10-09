


// Common Angular Items
import { Component, OnInit } from '@angular/core';



// RXJS Items
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';



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





// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';
import { signoffReq } from 'app/main/models/signoffReq';
import { designSignoff } from 'app/main/models/designSignoffs';




// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';




@Component({
	selector: 'app-marketplace',
	templateUrl: './marketplace.component.html',
	styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {


	marketplaceList : makDesign[];
	currentItem 	: makDesign;
	selectedType 	: string = "All";
	designTypes 	: string[];
	mobile 			: boolean = false;
	userData 		: any;
	dataFlag 		: boolean = false;
	signoffReqs 	: designSignoff[];
	signoffs 		: signoffReq[];
	marketplace$ 	: any[];

	private _unsubscribeAll: Subject<any>;




	constructor(	private CreatorStudioService 	: CreatorStudioService,
					private MarketplaceService 		: MarketplaceService,
					private DesignsService 			: DesignsService,
					private SignoffReqsService 		: SignoffReqsService,
					private DesignSignoffsService 	: DesignSignoffsService,
					private SnackBar 				: MatSnackBar,
					private afStorage 				: AngularFireStorage,
					private DesignEntityService 	: makDesignEntityService
		) { 

        // Get the user data
        this.userData = JSON.parse(localStorage.getItem('user'));
		this.dataFlag = false;
		this._unsubscribeAll = new Subject();
	}

	

	ngOnInit(): void {


		// Get the design types
		this.designTypes=this.CreatorStudioService.getDesignTypes();
		console.log('The design types are ...');
		console.log(this.designTypes);
		this.designTypes.unshift("All");


		if ( window.screen.width < 960 )
		{
			this.mobile = true;
		}

		// Set up the observers
		this.subscribeToData();

		this.DesignEntityService.getAll();
        this.marketplace$ = this.DesignEntityService.entities$



		// Trigger the function to get all valid designs
		this.DesignsService.getValidDesigns();

		// Trigger the function to see if the user has any signoff chances
		this.SignoffReqsService.getSignoffReqsForUser( this.userData.uid );


	}








	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR A DESIGN
	//
	// -----------------------------------------------------------------------------------------------------

	// Read
	subscribeToData()
	{

		// Subscribe to the valid designs
		this.DesignsService.designAllStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((designs)=>
		{ 
			if ( designs.length > 0 )
			{
				this.marketplaceList = designs;
				this.formatMarketplaceData();
			}

		});


		// Subscribe to the signoff reqs for the user
		this.SignoffReqsService.signoffReqUserStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((signoffReqs)=>
		{ 
			this.signoffReqs = signoffReqs;

			if (this.marketplaceList)
			{
				for (let a=0; a<this.marketplaceList.length; a++)
				{
					this.marketplaceList[a]['userReview'] = false;
				}

				let flag = true;
				for (let b=0; b<this.signoffReqs.length; b++)
				{
					flag = true;
					for (let a=0; a<this.marketplaceList.length; a++)
					{
						if ( this.marketplaceList[a]['id'] == this.signoffReqs[b]['designId'])
						{
							this.marketplaceList[a]['userReview'] = true;
							flag = false;
						}

					}


					if (flag)
					{

						this.DesignsService.fetchDesignData( this.signoffReqs[b]['designId'] )
							.subscribe(result=> {

								let addFlag = true;
								let tempData = result.docs[0].data();
								tempData['userReview'] = true;
								for (let c=0; c<this.marketplaceList.length; c++)
								{
									if (this.marketplaceList[c]['id']==tempData['id'])
									{
										addFlag=false;
									}
								}
								if (addFlag)
								{
									this.marketplaceList.push( JSON.parse(JSON.stringify(tempData )));
									this.formatMarketplaceData();
								}
							});
					}
				}

			}

		});

	}









	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO FORMAT OR PREPARE THE DATA AND PAGE
	//
	// -----------------------------------------------------------------------------------------------------

  	/*
  	*
  	*	This function formats the image data necessary
  	*
  	*/
	formatMarketplaceData()
	{

		for (var a=0; a<this.marketplaceList.length; a++)
		{

			this.marketplaceList[a]['imageUrls'] = [];
			for (var b=0; b<this.marketplaceList[a].marketplace.images.length; b++)
			{

				const myRef = this.afStorage.ref(this.marketplaceList[a].marketplace.images[b]['path']);
				this.marketplaceList[a]['imageUrls'].push(myRef.getDownloadURL());

				if (this.marketplaceList[a].marketplace.images[b]['mainImage'])
				{
					this.marketplaceList[a]['background'] = myRef.getDownloadURL();
				}
			}

		}

		this.dataFlag = true;

	}




}
