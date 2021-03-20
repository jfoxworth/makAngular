

// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Form Items
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NameCheckValidators } from 'src/app/main/Common/Validators/namecheck.validators';

// Services
import { UserService } from '../../../services/user.service';
import { SignoffReqsService } from '../../../services/signoff-reqs.service';

// Models
import { makDesign } from '../../../models/makDesign';
import { signoffReq } from '../../../models/signoffReq';
import { UserData } from 'src/app/main/models/userData';
import { makVersion } from '../../../models/makVersion';
import { makProject } from '../../../models/makProject';

// RXJS Items
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { designSignoff } from 'src/app/main/models/designSignoffs';

// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'mak-project-signoffs',
  templateUrl: './signoffs.component.html',
  styleUrls: ['./signoffs.component.scss']
})
export class SignoffsComponent implements OnInit {

  pdfUrls : any[]=[];
  @Input('currentProject') currentProject:makProject;
  @Input('makVersions') makVersions:makVersion[];
  @Input('signoffReqs') signoffReqs:signoffReq[];
  @Input('signoffs') signoffs:designSignoff[];
  @Output() displayMessage = new EventEmitter();
  @Output() updateProject = new EventEmitter();

  potentialUser 	        : any = {};
	testUser 			          : string;
	reqList 	  		        : any[] = [];
	private _unsubscribeAll : Subject<any>;

  constructor(
    private UserService 			    : UserService,
    private SignoffReqsService 		: SignoffReqsService,
    private afStorage 				    : AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.getUserImages();
    this.getPdfUrls();
  }



	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS RELATING TO THE SIGNOFFS
	//
	// -----------------------------------------------------------------------------------------------------

	// Check if a user or team name is valid
	checkUserEmail( name:string )
	{

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
	createDesignReq( userObj:UserData ): void
	{
    console.log(userObj);
		this.SignoffReqsService.createSignoffReq( userObj, this.currentProject, 'project' );
		this.potentialUser = {};
	}

	// Delete
	deleteSignoffReq( signoffReq:signoffReq ): void
	{
		this.SignoffReqsService.deleteSignoffReq( signoffReq.id );
	}




	// -----------------------------------------------------------------------------------------------------
	//
	// @ Get the user images to be displayed
	//
	// -----------------------------------------------------------------------------------------------------

  getUserImages()
	{
    console.log(this.signoffReqs);
    for (let a=0; a<this.signoffReqs.length; a++)
    {
      this.UserService.fetchUserData( this.signoffReqs[a].userId )
        .subscribe(result=> {
          this.reqList[this.signoffReqs[a].userId] = this.UserService.getProfileImage( <UserData>result.docs[0].data() );
      });

    }
			
    console.log(this.reqList);

	}




	// -----------------------------------------------------------------------------------------------------
	//
	// @ GET THE PDF URLS
	//
	// -----------------------------------------------------------------------------------------------------
  getPdfUrls()
  {
    this.signoffs.forEach((so,i)=>{
      const myRef = this.afStorage.ref(so['pdfPath']);
      this.pdfUrls[so.id]=myRef.getDownloadURL()
    });
    console.log(this.pdfUrls);
  }




}
