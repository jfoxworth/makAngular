
// Core items
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';

// Models
import { designSignoff } from '../../../models/designSignoffs';
import { makDesign } from '../../../models/makDesign';
import { signoffReq } from '../../../models/signoffReq';
import { makProject } from '../../../models/makProject';
import { UserData } from '../../../models/userData';

// Services
import { DesignSignoffsService } from '../../../services/design-signoffs.service';
import { CreatorStudioService } from '../../../services/creator-studio.service';

// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'mak-design-signoffs',
  templateUrl: './signoffs.component.html',
  styleUrls: ['./signoffs.component.scss']
})
export class SignoffsComponent implements OnInit {

  signoffStatus:number=0;
  signoffComments:string='';
  signoffPermission : boolean = false;
  pdfFile : any;
  pdfPath : string = '';

  @Input('signoffList') signoffList:designSignoff[];
  @Input('signoffReqList') signoffReqList:signoffReq[];
  @Input('designData') designData:makDesign;
  @Input('projectData') projectData:makProject;
  @Input('UserData') UserData:UserData;
	@Output() setVersionData = new EventEmitter();

  constructor( private DesignSignoffsService 	: DesignSignoffsService,
               private CreatorStudioService   : CreatorStudioService,
               private afStorage 				      : AngularFireStorage ) { }

  ngOnInit(): void {

    this.signoffPermission = this.checkSignoffPermission()

  }




	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR SIGNOFFS
	//
	// -----------------------------------------------------------------------------------------------------

  createNewSignoff( ):void
  {
    this.DesignSignoffsService.createDesignSignoff( JSON.parse(localStorage.getItem('user')),
                                                    this.projectData.id,
                                                    this.signoffStatus,
                                                    this.signoffComments,
                                                    this.pdfPath );

  }



	// -----------------------------------------------------------------------------------------------------
	//
	// @ CHECK IF CURRENT USER HAS SIGNOFF PERMISSION
	//
	// -----------------------------------------------------------------------------------------------------
  checkSignoffPermission()
  {
    this.signoffReqList.forEach(req=>{
      if ( ( req.itemId == this.projectData.id ) && ( req.userId == this.UserData.uid ) )
      {
        return true
      }
    });
    if ( this.projectData.creatorId == this.UserData.uid )
    {
      return true
    }
    return false
  }





	// -----------------------------------------------------------------------------------------------------
	//
	// @ THE UPLOAD FOR THE PDF; HOLD UNTIL USER SAVES SIGNOFF
	//
	// -----------------------------------------------------------------------------------------------------
  onUpload(event) {

    // Get a unique id for the upload and the path
		var random= this.CreatorStudioService.makeRandom(6);

		this.pdfPath = '/designpdfs/'+this.projectData.id+'-'+random+'.pdf';
    this.pdfFile = event.target.files[0];
		const task = this.afStorage.upload(this.pdfPath, event.target.files[0]);

  }


}
