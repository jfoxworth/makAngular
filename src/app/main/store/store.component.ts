


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





// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';




// Firestore Items
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';




@Component({
	selector: 'app-store',
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

//	storeItems 		: makDesign[];
	storeList 		: makDesign[];
	currentItem 	: makDesign;
	selectedType 	: string = "All";
	designTypes 	: string[];
	mobile 			: boolean = false;
	userData 		: any;
	dataFlag 		: boolean = false;
	private _unsubscribeAll: Subject<any>;




	constructor(	private CreatorStudioService 	: CreatorStudioService,
					private StoreService 			: StoreService,
					private DesignsService 			: DesignsService,
					private FirebaseService 		: FirebaseService,
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
		this.designTypes.unshift("All");


		if ( window.screen.width < 960 )
		{
			this.mobile = true;
		}

		// Set up the observers
		this.subscribeToData();


		// Trigger the function to get all valid designs
		this.DesignsService.getValidDesigns();


	}








	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR A DESIGN
	//
	// -----------------------------------------------------------------------------------------------------

	// Read
	subscribeToData()
	{

		// Subscribe to the designs for the user
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
