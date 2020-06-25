import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';


import { EcommerceService } from 'app/main/services/e-commerce.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MarketplaceService } from 'app/main/services/marketplace.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
    selector     : 'products',
    templateUrl  : './e-commerce.component.html',
    styleUrls    : ['./e-commerce.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EcommerceComponent implements OnInit
{

    projectList : any;
    versionList : any;
    columnsToDisplayMeas = ['name', 'value'];
    currentProject : any = {};
    currentVersion : any = {'id':''};
    currentDesign : any; 
    userData : any;
    designImageUrl : any;
    projectStages : string[];
    projectStatus : boolean[];
    selectedStatus : boolean[];
    stageTexts : any[];

    changesExist : boolean = false;
    versionChangesExist : boolean = false;


    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private EcommerceService: EcommerceService,
        private FirebaseService : FirebaseService,
        private MarketplaceService : MarketplaceService,
        public afs: AngularFirestore,
        private SnackBar: MatSnackBar,
        private afStorage : AngularFireStorage,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        // Scrape the user data
        this.userData = JSON.parse(localStorage.getItem('user'));


        // Get the product stages
        this.projectStages = this.EcommerceService.getProductStages();

        // Get the product status
        this.projectStatus = this.EcommerceService.getInitialStageStatus();

        // Set the product status
        this.selectedStatus = this.EcommerceService.getInitialSelectedStatus();

        // Get the status texts
        this.stageTexts = this.EcommerceService.getStageTexts();


        // Get the projects that this user has with this design
        //this.projectList = this.FirebaseService.getCollection('projects', 'creatorId', this.userData.uid);


        this.FirebaseService.getDocsByParam( 'projects', 'creatorId', this.userData.uid )
            .subscribe(result => {
                console.log('The result is ');
                console.log(result);
                var tempArray = [];
                var docData;
                result.forEach((doc) => {
                    docData=doc.data();
                    docData.uid=doc.id;
                    console.log(doc.id, '=>', doc.data());
                    tempArray.push(docData);
                });
                this.projectList = tempArray;
                if ( this.projectList.length > 0 )
                {
                    this.setCurrentProject( this.projectList[0] );
                }
                console.log(this.projectList);
        });



    }





    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------




    /**
     * 
     *  Set the current project to the one given
     *
     */
    setCurrentProject( project )
    {

        this.currentProject = project; 
        this.getVersions( project.uid ); 
        this.getDesign( project.designId );
    }









    /**
     * Get versions for a project
     */
    getVersions( projectId ): void
    {

        console.log('In the get versions function with an id of '+projectId);
        this.FirebaseService.getDocsByParamWithOrder( 'versions', 'projectId', projectId, 'version' )
            .subscribe(result => {
                console.log('The result is ');
                console.log(result);
                var tempArray = [];
                var docData;
                result.forEach((doc) => {
                    docData=doc.data();
                    docData.uid=doc.id;
                    console.log(doc.id, '=>', doc.data());
                    tempArray.push(docData);
                });
                this.versionList = tempArray;
                this.onVersionSelected( this.versionList.length-1 );
                console.log(this.versionList);
        });

    }



    /**
     * Get design for a project
     */
    getDesign( designId ): void
    {
		this.currentDesign = this.FirebaseService.getDocById( 'designs', designId ).then(response=> {
			this.currentDesign=response.data();

            // Get the main background image
            for (var a=0; a<this.currentDesign.marketplace.images.length; a++)
            {
            	if ( this.currentDesign.marketplace.images[a]['mainImage'] )
            	{
					const ref = this.afStorage.ref(this.currentDesign.marketplace.images[a]['path']);
					this.designImageUrl = ref.getDownloadURL();
				}
			}
		});
    }



    /**
     * When a version is selected
     */
    onVersionSelected(versionIndex): void
    {

        this.currentVersion = this.versionList[versionIndex];
        this.currentVersion.measurements = [];
        for (const property in this.currentVersion.values) {
            this.currentVersion.measurements.push({'name': property, 'value': this.currentVersion.values[property] });
        }

        if ( versionIndex==this.versionList.length-1 ){ this.currentVersion.latest=true; }

    }






	/*
	*
	* When the version needs to be saved
	*
	*/
	saveVersion( ) 
	{
		console.log('Saving version '+this.currentVersion.uid);
		this.FirebaseService.updateDocDataUsingId('versions', this.currentVersion.uid, this.currentVersion );
		this.SnackBar.open('Version Saved','', {duration: 4000});

	}



	/*
	*
	* When a new version is to be created
	*
	*/
	createNewVersion( type ) 
	{
		console.log('Creating new version '+type);

		let versionsCollection = this.afs.collection('versions');
		const versionId = this.afs.createId();

		if ( type == 'default' )
		{
		    versionsCollection.doc(versionId).set(this.MarketplaceService.versionTemplate( this.currentProject.uid, versionId, this.versionList.length+1, this.currentDesign ));


		}else
		{
			let tempVer = this.MarketplaceService.versionTemplate( this.currentProject.uid, versionId, this.versionList.length+1, this.currentDesign );
			tempVer.values = this.versionList[type]['values'];
		    versionsCollection.doc(versionId).set(tempVer);
		}


		this.getVersions( this.currentProject.uid );
		this.SnackBar.open('New version created','', {duration: 4000});

	}





	/*
	*
	* When the project needs to be saved
	*
	*/
	saveProject( ) 
	{
		console.log('Saving project ');
		this.FirebaseService.updateDocDataUsingId('projects', this.currentProject.uid, this.currentProject );
		this.SnackBar.open('Project Saved','', {duration: 4000});

	}









    /**
     *
     * Set the selected Item
     *
     */
    setSelected( num:number ): void
    {
        for (var a=0; a<this.selectedStatus.length; a++)
        {
            if ( a == num )
            {
                this.selectedStatus[a]=true;
            }else
            {
                this.selectedStatus[a]=false;                
            }
        }
    }



}

