// Core items
import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { UserData } from '../../../models/userData';
import { makDesign } from '../../../models/makDesign';
import { makVersion } from '../../../models/makVersion';

// Services
import { ProjectsService } from '../../../services/projects.service';
import { CreatorStudioService } from '../../../services/creator-studio.service';

// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'mak-design-cost',
  templateUrl: './design-cost.component.html',
  styleUrls: ['./design-cost.component.scss']
})
export class DesignCostComponent implements OnInit {

	@Input('userData') userData:UserData;
	@Input('designData') designData:makDesign;
	@Input('versionData') versionData:makVersion;
  pdfUrl : any;

  constructor( private ProjectsService : ProjectsService,
               private router	         : Router,
               private afStorage 			 : AngularFireStorage,
               private CreatorStudioService   : CreatorStudioService, ) { }

  ngOnInit(): void {
    this.getPdfUrl();

  }

  // When a user wants to add a new project based upon a design
  addMyProject( ) {
    this.ProjectsService.createProject( this.designData, this.versionData  );
    this.router.navigateByUrl('/projects');
    }



	// -----------------------------------------------------------------------------------------------------
	//
	// @ GET THE PDF URL
	//
	// -----------------------------------------------------------------------------------------------------
  getPdfUrl()
  {
    const myRef = this.afStorage.ref('/initialdesignpdfs/'+this.designData.id+'.pdf');
    this.pdfUrl=myRef.getDownloadURL()
  }




	// -----------------------------------------------------------------------------------------------------
	//
	// @ THE UPLOAD FOR THE PDF; HOLD UNTIL USER SAVES SIGNOFF
	//
	// -----------------------------------------------------------------------------------------------------
  onUpload(event) {

		let pdfPath = '/initialdesignpdfs/'+this.designData.id+'.pdf';
		const task = this.afStorage.upload(pdfPath, event.target.files[0]);
    this.getPdfUrl();

  }

}
