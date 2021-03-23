import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


// Models
import { makDesign } from '../../../models/makDesign';
import { makVersion } from '../../../models/makVersion';
import { makProject } from '../../../models/makProject';
import { UserData } from '../../../models/userData';

// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'mak-tech-drawings',
  templateUrl: './tech-drawings.component.html',
  styleUrls: ['./tech-drawings.component.scss']
})
export class TechDrawingsComponent implements OnInit {

  @Input('UserData') UserData:UserData;
	@Input('designData') designData:makDesign;
	@Input('versionData') versionData:makVersion;
	@Input('projectData') projectData:makProject;
  pdfUrl : any;


  constructor( private router	: Router,
               private afStorage : AngularFireStorage, ) { }

  ngOnInit(): void {
    this.getPdfUrl();
  }




	// -----------------------------------------------------------------------------------------------------
	//
	// @ GET THE PDF URL
	//
	// -----------------------------------------------------------------------------------------------------
  getPdfUrl()
  {
    const myRef = this.afStorage.ref('/initialdesignpdfs/'+this.projectData.id+'.pdf');
    this.pdfUrl=myRef.getDownloadURL()
  }




	// -----------------------------------------------------------------------------------------------------
	//
	// @ THE UPLOAD FOR THE PDF; HOLD UNTIL USER SAVES SIGNOFF
	//
	// -----------------------------------------------------------------------------------------------------
  onUpload(event) {

		let pdfPath = '/initialdesignpdfs/'+this.projectData.id+'.pdf';
		const task = this.afStorage.upload(pdfPath, event.target.files[0]);
    this.getPdfUrl();

  }

}
