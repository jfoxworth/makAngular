import { Component, OnDestroy, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';


// Services
import { DesignStudioService } from 'app/main/services/design-studio.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';

import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-design-studio',
  templateUrl: './design-studio.component.html',
  styleUrls: ['./design-studio.component.scss']
})
export class DesignStudioComponent implements AfterViewInit {

	require : any;
	window : any;
	SDVApp : any;

    shapediver:any;
    designData:any;
    projectData : any;
    versionData : any;
    versionList : any;
    versionCollection : any;
    searchInput: any;
    studioType:string;
    dataFlag:boolean=false;
    designId : string;
    projectId : string;
    versionId : string;
    shapediverApi : any;
    shapeData : any;



	constructor(private DesignStudioService: DesignStudioService,
				private route: ActivatedRoute,
				private AuthService : AuthService,
				private FirebaseService : FirebaseService,
				private afStorage : AngularFireStorage,
				@Inject(DOCUMENT) private document: Document) { 


	}





	ngOnInit() {


    }





	


	ngAfterViewInit() {


		// If the viewer is looking at a design that is not yet approved
		// The url is /design/{ID of design}
		if ( this.route.snapshot.url[1] === undefined )
		{
			this.studioType = 'studio';

			this.designId = 'jBRzSildNc16fQjAmLkh';

			this.designData = this.FirebaseService.getDocById( 'designs', this.designId ).then(response=> {
				this.designData=response.data();
				this.dataFlag=true;
				this.initializeMenu();
				this.initializeModel();

			});


		}else if ( this.route.snapshot.url[1].toString() == 'design' )
		{
			this.studioType = 'design';
			this.designId = this.route.snapshot.paramMap.get('designId');

			this.designData = this.FirebaseService.getDocById( 'designs', this.designId ).then(response=> {
				this.designData=response.data();
				this.dataFlag=true;
				console.log('The data is');
				console.log(this.designData);
				this.initializeMenu();
				this.initializeModel();

			});



		// If the viewer is looking at a project - the nominal case of a user working on a project
		}else if ( this.route.snapshot.url[1].toString() == 'project' )
		{

			this.studioType = 'project';
			this.projectId = this.route.snapshot.paramMap.get('projectId');

			this.projectData = this.FirebaseService.getDocById( 'projects', this.projectId ).then(response=> {
				
				this.projectData = response.data();
				console.log('The project data is ');
				console.log(this.projectData);

				this.designData = this.FirebaseService.getDocById('designs',this.projectData.designId ).then(response=>{

					this.designData = response.data();
					console.log('The design data is ');
					console.log(this.designData);


					console.log('Getting all pversions with a projectId of '+this.projectData.uid);
					this.FirebaseService.getDocsByParam( 'versions', 'projectId', this.projectData.uid )
						.then((snapshot) => {
							var tempArray = [];
							var docData;
							snapshot.forEach((doc) => {
								docData=doc.data();
								docData.uid=doc.id;
								console.log(doc.id, '=>', doc.data());
								tempArray.push(docData);
							});
							this.versionList = tempArray;
							console.log(this.versionList);
							this.versionData = this.versionList[this.versionList.length-1];
							console.log('The version data is ...');
							console.log(this.versionData);
							this.dataFlag=true;
							this.initializeMenu();
							this.initializeModel();
							this.calcPrice();
						})
						.catch((err) => {
						  console.log('Error getting documents', err);
					});


				});

			});


		// The user is looking at the design studio - possibly not logged in
		}else
		{

			this.studioType = 'studio';

			this.designId = 'jBRzSildNc16fQjAmLkh';

			this.designData = this.FirebaseService.getDocById( 'designs', this.designId ).then(response=> {
				this.designData=response.data();
				this.dataFlag=true;
				this.initializeMenu();
				this.initializeModel();

			});

		}

	}







	/*
	*
	* Called once when the app loads, this sets the menus
	*
	*/
	initializeMenu() {

		console.log('Initializing the menu for type : '+this.studioType);

		// Add and remove the windows for the project menu and cost
		if ( this.studioType == 'design' )
		{
        	this.designData.parameterMenus.unshift(this.DesignStudioService.getDesignMenu());
		
		}else if ( this.studioType == 'project' )
		{
        	this.designData.parameterMenus.unshift(this.DesignStudioService.getProjectMenu());			

		}else if ( this.studioType == 'studio' )
		{
        	this.designData.parameterMenus.unshift(this.DesignStudioService.getStudioMenu());			
		}
		this.designData.parameterMenus.push(this.DesignStudioService.getCostMenu( this.studioType ));
		this.designData.menuLocations = this.DesignStudioService.getMenuLocations();


        // Add the array to hide/show the side menus
        this.designData.menuShow = [];
		this.designData.parameterMenus.forEach((value, index) => {
			this.designData.menuShow[index] =  false;
		});

	}









	/*
	*
	* Called once when the app loads, this sets the menus
	*
	*/
	initializeModel() {


		// Create the shapediver window
		//this.window = window;
		//this.window.api = new SDVApp.ParametricViewer({
		// @ts-ignore
		this.shapediverApi = new SDVApp.ParametricViewer({
		ticket: this.designData.shapediverTicket,
		container : document.getElementById('modelDiv'),
		modelViewUrl: 'eu-central-1', // or 'us-east-1' or address of your own ShapeDiver model view server
		});

		console.log('Initialize Model called');

		// Wait a few seconds and then place the data from the call into the model
		setTimeout( () => { 

			let paramChanges = [];
			let isChanged = false;

			// Pull the values from the shape diver ticket
			this.shapeData = this.shapediverApi.parameters.get();

			// Loop through the data and set the parameters to the
			// proper values. Elements within the menus were already
			// named the necessary value to make this work.
			this.shapeData.data.forEach( (element) => {

				for ( var a=1; a<this.designData.parameterMenus.length-1; a++ )
				{
					//console.log('a is '+a);

					for ( var b=0; b<this.designData.parameterMenus[a]['parameters'].length; b++ )
					{
						//console.log('b is '+b);

						// If the shapediver name for this design matches the name of this element in the sent data
						//console.log('Comparing '+this.designData.parameterMenus[a]['parameters'][b]['shapediver']+' to '+element.name);
						if ( this.designData.parameterMenus[a]['parameters'][b]['shapediver'] == element.name )
						{
							//console.log('Worked for type '+this.designData.parameterMenus[a]['parameters'][b]['type']+' with value of '+element.value);


							// If the user has a predefined model/version that they are working on,
							// check to see if there is a stored value for it. If not, store the
							// default value.
							if ( this.studioType == "project" )
							{
								// if there is a parameter for which there is no value in this version set one
								if ( this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] === undefined  )
								{
									this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] = element.value;
								}

								// Set the design data to the version data
								this.designData.parameterMenus[a]['parameters'][b]['value'] = this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']];
							
								// If the parameter from shapediver has a different value than the one
								// for this version, prep it to be shipped to update design
								if ( this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] != element.value  )
								{
									paramChanges.push({'name':element.name, 'value' : this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']]});
									isChanged = true;
								}
							
							// if the user is looking at the design or is simply in the studio, 
							// the default values for this model in 
							// shapediver are used to set the form values and the data
							}else if ( ( this.studioType == 'design') || ( this.studioType == 'studio' ) )
							{
								this.designData.parameterMenus[a]['parameters'][b]['value'] = element.value;								
							}
						}

						// Handle the case where this is an uploaded image
						if ( ( element['type'] == 'File' ) && 
							 ( this.designData.parameterMenus[a]['parameters'][b]['type'] == "upload" ) &&
							 ( this.designData.parameterMenus[a]['parameters'][b]['shapediver'] == element.name) )
						{
							console.log('The element '+element.name+' is a file upload');
							if ( this.versionData.uploadedImage !== undefined )
							{
								// Get URL
								const url = this.afStorage.ref( this.versionData.uploadedImage['path'] )
															.getDownloadURL()
															.subscribe(url => {
																				console.log('The URL is '+url);
																				paramChanges.push({'name':'Upload Logo', 'value': url });
																			});
							}
						}


					}
				}


			});

			if ( this.studioType == "project" )
			{
				this.saveVersion( this.versionData );
				if ( isChanged )
				{
					this.updateMultipleParameters( paramChanges );					
				}
			}

			console.log('The design data is ...');
			console.log(this.designData);

			console.log('The param changes are ...');
			console.log(paramChanges);


		 }, 4000);

	}









	/*
	*
	* When the user changes a parameter on the template
	* and the shapediver model is updated
	*
	*/
	updateParameter( parameters ) 
	{
		console.log('Updating the parameter '+parameters.name+' with the value '+parameters.value);

		// Send the update to shapediver so that the model is updated
		this.shapediverApi.parameters.updateAsync({name: parameters.name, value: parameters.value });


		// Update the version data
		this.versionData.values[parameters.name] = parameters.value;
		this.saveVersion( this.versionData );
		this.calcPrice()

	}



	/*
	*
	* When the user changes a parameter on the template
	* and the shapediver model is updated
	*
	*/
	updateMultipleParameters( parameters ) 
	{
		console.log('Updating parameters ...');
		console.log(parameters);
		this.shapediverApi.parameters.updateAsync( parameters );
	}







	/*
	*
	* When the user uploads a file
	*
	*/
	uploadFile( event, paramName ) 
	{
		console.log('Uploading a file to the parameter '+paramName);

		// Get the file and the image type
		const file = event.target.files[0];
		var imageType = file.type.replace('image/','');


		// Get a unique id for the upload and the path
		let text = "";
		let possible = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for (let i = 0; i < 6; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
  		}
		var path = '/studio/logo/'+this.versionData.uid+'-'+text+'.'+imageType;			

		console.log('Uploading image to Upload Logo');
		// Send the update to shapediver so that the model is updated
		this.shapediverApi.parameters.updateAsync({'name': 'Upload Logo', 'value': event.target.files[0] });

		// Upload file
		const task = this.afStorage.upload(path, event.target.files[0]);

		// Update the version data
		this.versionData.uploadedImage = {'path':path, 'parameter' : 'Upload Logo'};
		this.saveVersion( this.versionData );

	}






	/*
	*
	* When the version needs to be saved
	*
	*/
	saveVersion( versionData ) 
	{
		console.log('Saving version '+versionData.uid);
		this.FirebaseService.updateDocDataUsingId('versions', versionData.uid, versionData );

	}



	/*
	*
	* When a new version is to be created
	*
	*/
	createNewVersion( ) 
	{
		console.log('Creating new version ');
		let tempVer = this.versionData;
		tempVer['version'] = this.versionList.length;
		this.FirebaseService.createDocInCollection('versions', tempVer);

	}





	/*
	*
	* When a version is selected
	*
	*/
	setVersionData( thisVersion ) 
	{
		console.log('setting version to '+thisVersion.version);

		let paramChanges=[];
		let isChanged=false;

		this.shapeData.data.forEach( (element) => {

			for ( var a=1; a<this.designData.parameterMenus.length-1; a++ )
			{
				for ( var b=0; b<this.designData.parameterMenus[a]['parameters'].length; b++ )
				{
					if ( this.designData.parameterMenus[a]['parameters'][b]['shapediver'] == element.name )
					{
						if ( thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] === undefined  )
						{
							thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] = element.value;
						}

						this.designData.parameterMenus[a]['parameters'][b]['value'] = thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']];
						
						console.log('Comparing '+this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] +' to '+thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']]);
						if ( this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] != 
							 thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']]  )
						{
							paramChanges.push({'name':element.name, 'value' : thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']]});
							isChanged = true;
						}
						
					}
				}
			}
		});

		if ( isChanged )
		{
			console.log('Updating parameters ...');
			console.log(paramChanges);
			this.updateMultipleParameters( paramChanges );			
		}

		this.versionData = thisVersion;

		this.calcPrice();

	}



	/*
	*
	* Calculate the price of a version
	*
	*/
	calcPrice( ) 
	{
		this.versionData.price = this.DesignStudioService.setPrice(this.designData, this.versionData);
	}



}

