import { Injectable } from '@angular/core';
import { DesignStudioService } from 'app/main/services/design-studio.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {


	projectsCollection : any;
	versionsCollection : any;

  constructor(	private FirebaseService : FirebaseService,
				private afStorage : AngularFireStorage,
				public afs: AngularFirestore,   // Inject Firestore service
				private DesignStudioService : DesignStudioService ) {}


	/**
	 * Add product
	 *
	 * 
	 */
	addProject( designObj ): void
	{
		console.log('In the add product function with design id of '+designObj.uid );


		// Get projects collection, create an id, and then set a new project 
		// with the data for this design
		this.projectsCollection = this.afs.collection('projects');
		const projectId = this.afs.createId();
	    this.projectsCollection.doc(projectId).set(this.projectTemplate( projectId, designObj ));
	

	    // Get the versions collection, create an ID, and then set a new version
		this.versionsCollection = this.afs.collection('versions');
		const versionId = this.afs.createId();
	    this.versionsCollection.doc(versionId).set(this.versionTemplate( projectId, versionId, 1, designObj ));


	}








	/**
	 * Project Template
	 *
	 * 
	 */
	projectTemplate( uid, designObj )
	{
		var date = new Date(); 
		var timestamp = date. getTime();
		var userData = JSON.parse(localStorage.getItem('user'));
		
		return {
			'uid'			: uid,
			'designId' 		: designObj.uid,
			'dateCreated'	: timestamp,
			'creatorId'		: userData.uid,
			'name'			: 'My Project',
			'versions'		: '1',
			'designType'	: designObj.category,
			'status'		: '0',
			'description'	: "This is the description of this project",
			'initialOpen'	: false
		}

	}







	/**
	 * Version Template
	 *
	 * 
	 */
	versionTemplate( projectId, versionId, versionNum, designObj )
	{
		var date = new Date(); 
		var timestamp = date. getTime();
		var userData = JSON.parse(localStorage.getItem('user'));
		
		return {
			'uid'			: versionId,
			'version'		: versionNum,
			'designId' 		: designObj.uid,
			'projectId'		: projectId,
			'dateCreated'	: timestamp,
			'creatorId'		: userData.uid,
			'name'			: 'New Version',
			'description'	: "This is the description of this version",
			'values'		: {},
			'initialOpen'	: false
		}

	}





	formatDesigns()
	{
		console.log('---------------------------------------');
	}


}
