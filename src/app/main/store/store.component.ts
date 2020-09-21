


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
import { StoreService } from 'app/main/services/store.service';
import { DesignsService } from 'app/main/services/designs.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';
import { DesignSignoffsService } from 'app/main/services/design-signoffs.service';





// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';
import { signoffReq } from 'app/main/models/signoffReq';
import { designSignoff } from 'app/main/models/designSignoffs';




// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';




@Component({
	selector: 'app-store',
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {


	storeList 		: makDesign[];
	currentItem 	: makDesign;
	selectedType 	: string = "All";
	designTypes 	: string[];
	mobile 			: boolean = false;
	userData 		: any;
	dataFlag 		: boolean = false;
	signoffReqs 	: designSignoff[];
	signoffs 		: signoffReq[];

	private _unsubscribeAll: Subject<any>;




	constructor(	private CreatorStudioService 	: CreatorStudioService,
					private StoreService 			: StoreService,
					private DesignsService 			: DesignsService,
					private SignoffReqsService 		: SignoffReqsService,
					private DesignSignoffsService 	: DesignSignoffsService,
					private SnackBar 				: MatSnackBar,
					private afStorage 				: AngularFireStorage 
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
				this.storeList = designs;
				this.formatStoreData();
			}

		});


		// Subscribe to the signoff reqs for the user
		this.SignoffReqsService.signoffReqUserStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((signoffReqs)=>
		{ 
			this.signoffReqs = signoffReqs;

			if (this.storeList)
			{
				for (let a=0; a<this.storeList.length; a++)
				{
					this.storeList[a]['userReview'] = false;
				}

				let flag = true;
				for (let b=0; b<this.signoffReqs.length; b++)
				{
					flag = true;
					for (let a=0; a<this.storeList.length; a++)
					{
						if ( this.storeList[a]['id'] == this.signoffReqs[b]['designId'])
						{
							this.storeList[a]['userReview'] = true;
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
								for (let c=0; c<this.storeList.length; c++)
								{
									if (this.storeList[c]['id']==tempData['id'])
									{
										addFlag=false;
									}
								}
								if (addFlag)
								{
									this.storeList.push( JSON.parse(JSON.stringify(tempData )));
									this.formatStoreData();
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
	formatStoreData()
	{

		for (var a=0; a<this.storeList.length; a++)
		{

			this.storeList[a]['imageUrls'] = [];
			for (var b=0; b<this.storeList[a].marketplace.images.length; b++)
			{

				const myRef = this.afStorage.ref(this.storeList[a].marketplace.images[b]['path']);
				this.storeList[a]['imageUrls'].push(myRef.getDownloadURL());

				if (this.storeList[a].marketplace.images[b]['mainImage'])
				{
					this.storeList[a]['background'] = myRef.getDownloadURL();
				}
			}

		}

		this.dataFlag = true;

	}




}
