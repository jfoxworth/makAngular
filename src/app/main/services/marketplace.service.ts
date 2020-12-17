import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {


	projectsCollection : any;
	versionsCollection : any;

  constructor(	public afs: AngularFirestore ) {}


	/**
	 * Add product
	 */
	addProject( designObj ): void
	{
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




  /**
   *  Get images
   */
  getProductImages(id:string, state:any):any[]
  {
    let images = [];
    if (state.type)
    {
      let temp = JSON.parse(JSON.stringify(state));
      delete temp.type
      images = Object.values(temp);
    }else
    {
      let temp = JSON.parse(JSON.stringify(state));
      images = Object.values(temp);
    }

    for (let a=0; a<images.length; a++)
    {
      if ( images[a]['itemId'] != id )
      {
        images.splice(a,1);
        a=a-1;
      }
    }
    return images

  }

}
