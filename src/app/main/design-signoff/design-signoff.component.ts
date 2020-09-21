




// Common Angular Items
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';


import {CdkTextareaAutosize} from '@angular/cdk/text-field';


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
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDividerModule } from '@angular/material/divider';



// Services
import { DesignsService } from 'app/main/services/designs.service';
import { ProjectsService } from 'app/main/services/projects.service';
import { VersionsService } from 'app/main/services/versions.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';
import { DesignSignoffsService } from 'app/main/services/design-signoffs.service';
import { UserService } from 'app/main/services/user-service.service';





// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';
import { signoffReq } from 'app/main/models/signoffReq';
import { designSignoff } from 'app/main/models/designSignoffs';






@Component({
  selector: 'app-design-signoff',
  templateUrl: './design-signoff.component.html',
  styleUrls: ['./design-signoff.component.scss']
})
export class DesignSignoffComponent implements OnInit {


	signoffList 				: designSignoff[] = [];
	designData 					: makDesign;
	signoffReq 					: signoffReq;
	signoffReqList 				: signoffReq[];
	userData 					: any;
	designId 					: string;
	approveStatus 				: boolean = false;
	signoffComments 			: string = '';
	designDataFlag 				: boolean = false;
	private _unsubscribeAll 	: Subject<any>;


	constructor(	private DesignsService 			: DesignsService,
					private ProjectsService 		: ProjectsService,
					private VersionsService 		: VersionsService,
					private UserService 			: UserService,
					private SignoffReqsService 		: SignoffReqsService,
					private DesignSignoffsService 	: DesignSignoffsService,
					private route 					: ActivatedRoute,
		) { 

		this._unsubscribeAll = new Subject();
	}




	ngOnInit(): void {

		// Get the user data
		this.userData = JSON.parse(localStorage.getItem('user'));

		this.subscribeToData();
		this.designId = this.route.snapshot.paramMap.get('designId');
		this.DesignSignoffsService.getdesignSignoffsForDesign( this.designId );
		this.SignoffReqsService.getSignoffReqsForDesignUser( this.userData.uid, this.designId )	;
		this.SignoffReqsService.getSignoffReqsForDesign( this.designId );
		this.DesignsService.getDesignById( this.designId );
	}




	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------



	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO SUBSCRIBE TO DATA
	//
	// -----------------------------------------------------------------------------------------------------

	// Read
	subscribeToData()
	{

		// Subscribe to the signoff data
		this.DesignSignoffsService.designSignoffStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((signoffs)=>
		{ 
			this.signoffList = signoffs;

			if ( this.signoffList )
			{
				for (let a=0; a<this.signoffList.length; a++)
				{
					this.UserService.fetchUserData( this.signoffList[a].creatorId )
						.subscribe(result=> {
							this.signoffList[a]['userImage'] = this.UserService.getProfileImage( result.docs[0].data() );
						});

				}
			}

			console.log('The signoff list is ...');
			console.log(signoffs);
		});



		// Subscribe to the design data
		this.DesignsService.designStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((design)=>
		{ 
			console.log('The design is ');
			console.log(design);
			this.designData = design;
			if (design.description)
			{
				this.designDataFlag = true;
			}
		});



		// Subscribe to the req data for this user
		this.SignoffReqsService.signoffReqDesignUserStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((signoffReq)=>
		{ 
			this.signoffReq = signoffReq;
		});



		// Subscribe to the req data for all users
		this.SignoffReqsService.signoffReqStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((signoffReqs)=>
		{ 
			this.signoffReqList = signoffReqs;

			if ( this.signoffReqList )
			{
				for (let a=0; a<this.signoffReqList.length; a++)
				{
					this.UserService.fetchUserData( this.signoffReqList[a].userId )
						.subscribe(result=> {
							this.signoffReqList[a]['userImage'] = this.UserService.getProfileImage( result.docs[0].data() );
						});

				}
			}

		});


	}





	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTION TO SET NEW SIGNOFF
	//
	// -----------------------------------------------------------------------------------------------------

	createNewSignoff()
	{
		this.DesignSignoffsService.createDesignSignoff( this.userData, 
														this.designId, 
														this.approveStatus, 
														this.signoffComments );
	}



}
