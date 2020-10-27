

/*

	This is the controller for the primary component of the app - the
	design studio. 

*/

// Common Angular Items
import { Component, OnDestroy, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';


// Angular Material Items
import { MatSnackBar } from '@angular/material/snack-bar';


// RXJS 
import { debounceTime, distinctUntilChanged, takeUntil, finalize } from 'rxjs/operators';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';


// Fuse specific items
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';


// Services
import { DesignStudioService } from 'app/main/services/design-studio.service';
import { DesignsService } from 'app/main/services/designs.service';
import { ProjectsService } from 'app/main/services/projects.service';
import { VersionsService } from 'app/main/services/versions.service';
import { AuthService } from 'app/main/services/auth.service';
import { UserService } from 'app/main/services/user-service.service';
import { DesignSignoffsService } from 'app/main/services/design-signoffs.service';
import { SignoffReqsService } from 'app/main/services/signoff-reqs.service';
import { FirebaseService } from 'app/main/services/firebase.service';

import { makDesignEntityService } from 'app/main/services/entity/makDesign-entity.service';
import { makVersionEntityService } from 'app/main/services/entity/makVersion-entity.service';
import { makProjectEntityService } from 'app/main/services/entity/makProject-entity.service';
import { signoffReqEntityService } from 'app/main/services/entity/signoffReq-entity.service';



// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';


// Models
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';
import { signoffReq } from 'app/main/models/signoffReq';
import { designSignoff } from 'app/main/models/designSignoffs';
import { UserData } from 'app/main/models/userData';



// NGRX Items
import { Store } from "@ngrx/store";
import { AppState } from 'app/main/reducers';
import { DesignState } from 'app/main/reducers';
import { designImagesSave } from 'app/main/actions/design.actions';
import { designImagesReducer } from 'app/main/reducers/index';
import { DesignActions } from 'app/main/actions/designAction-types';



@Component({
	selector: 'app-design-studio',
	templateUrl: './design-studio.component.html',
	styleUrls: ['./design-studio.component.scss']
})
export class DesignStudioComponent  {

	require : any;
	window : any;
	SDVApp : any;

	shapediver:any;


//	designData:any = { 'parameterMenus' : [{ 'parameters': [ { 'images':[] }]}] };
//	projectData : any;
//	versionData : any;

	makDesigns$ 		: Observable<makDesign[]>;
	makProjects$ 		: Observable<makProject[]>;
	makVersions$ 		: Observable<makVersion[]>;
	makSignoffReqs$ 	: Observable<signoffReq[]>;
	makDesignSignoffs$ 	: Observable<designSignoff[]>;

	designList 			: makDesign[];
	projectList 		: makProject[];
	versionList 		: makVersion[];
	signoffList 		: designSignoff[];
	signoffReqList 		: signoffReq[];

	designData 			: makDesign=<makDesign>{};
	projectData 		: makProject;
	versionData 		: makVersion;
	signoffData 		: designSignoff;


	versionCollection 	: any;
	searchInput 		: any;
	studioType 			: string;
	shapediverApi 		: any;
	shapeData 			: any;
	flowersJSON 		: any;
	flowerFlag 			: boolean = false;
	editableVersion 	: boolean = true;
	userData 			: UserData;
	paramName 			: any;


	private _unsubscribeAll: Subject<any>;


	constructor(	private DesignStudioService 		: DesignStudioService,
					private DesignsService 				: DesignsService,
					private ProjectsService 			: ProjectsService,
					private VersionsService 			: VersionsService,
					private DesignSignoffsService		: DesignSignoffsService,
					private SignoffReqsService 			: SignoffReqsService,
					private AuthService 				: AuthService,
					private FirebaseService 			: FirebaseService,
					private afStorage 					: AngularFireStorage,
					private route 						: ActivatedRoute,
					private activeRoute 				: ActivatedRoute,
					private SnackBar 					: MatSnackBar,
					private DesignEntityService 		: makDesignEntityService,
					private SignoffReqEntityService 	: signoffReqEntityService,
					private ProjectEntityService 		: makProjectEntityService,
					private VersionEntityService 		: makVersionEntityService,
					private store 						: Store<AppState>,
					private designStore 				: Store<DesignState>,
					@Inject(DOCUMENT) private document 	: Document) 
	{ 
		this._unsubscribeAll = new Subject();
	}





	ngOnInit() {


		this.userData = JSON.parse(localStorage.getItem('UserData'));


		// The observable for the design data from the store. Since no design is 
		this.makDesigns$ = this.DesignEntityService.entities$
		this.makDesigns$.subscribe( (makDesigns)=>{
			this.designList = makDesigns;
			//this.setDesign('jBRzSildNc16fQjAmLkh');
		});


		// The observable for the projects for this design
		this.makProjects$ = this.ProjectEntityService.entities$
		this.makProjects$.subscribe( (makProjects)=>{
			this.projectList = makProjects;
		});


		// The observable for the projects for this design
		this.makVersions$ = this.VersionEntityService.entities$
		this.makVersions$.subscribe( (makVersions) =>{
			this.versionList = makVersions;
		});


		// The observable for the signoff reqs from the store
		this.makSignoffReqs$ = this.SignoffReqEntityService.entities$
		this.makSignoffReqs$ .subscribe( (makSignoffReqs) =>{
			this.signoffReqList = makSignoffReqs;
		});




		// Came to the /designStudio page with nothing else
		if ( this.route.snapshot.url[1] === undefined )
		{

			console.log('Here 1');
			this.studioType = 'studio';

			// What if there is a stored design in local memory
			if ( JSON.parse(localStorage.getItem('makDesign')) )
			{
				this.designData = JSON.parse(localStorage.getItem('makDesign'));
//				this.projectData = JSON.parse(localStorage.getItem('makProject'));
				this.versionData = JSON.parse(localStorage.getItem('makVersion'));
				this.versionList.push(this.versionData);
			
			}else
			{

				this.setDesign('jBRzSildNc16fQjAmLkh');
				this.versionData = <makVersion>JSON.parse(JSON.stringify(this.VersionsService.blankVersion()));
				this.versionList.push(this.versionData);
			}
			this.initializeAll();


		// WHen a user is navigating using the icon menu to a preset design
		}else if ( ( this.route.snapshot.url[1].toString() != 'design' ) &&
				   ( this.route.snapshot.url[1].toString() != 'project') )
		{

			console.log('Here 2');
			this.studioType = 'studio';
			this.setDesign( this.route.snapshot.url[1].toString() );
			this.versionData = <makVersion>JSON.parse(JSON.stringify(this.VersionsService.blankVersion()));
			this.versionList.push(this.versionData);
			this.initializeAll();


		// WHen a user is looking at a design that is likely not live
		}else if ( this.route.snapshot.url[1].toString() == 'design' )
		{

			console.log('Here 3');
			this.studioType = 'design';
			this.setDesign( this.route.snapshot.paramMap.get('designId') );
			this.versionData = <makVersion>JSON.parse(JSON.stringify(this.VersionsService.blankVersion()));
			this.versionList.push(this.versionData);
			this.initializeAll();


		// If the viewer is looking at a project - the nominal case of a user working on a project
		}else if ( this.route.snapshot.url[1].toString() == 'project' )
		{

			console.log('Here 4');
			this.studioType = 'project';
			this.setProject(  this.route.snapshot.paramMap.get('projectId') );
			this.initializeAll();


		// The user is looking at the design studio - possibly not logged in
		}else
		{
			this.studioType = 'studio';
			this.setDesign('jBRzSildNc16fQjAmLkh');
			this.initializeAll();

		}

	}






	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------




	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO SET THE DESIGN, PROJECT, or VERSION
	//
	// -----------------------------------------------------------------------------------------------------

	setDesign( designId )
	{
		this.designList.forEach( (design) =>{

			if ( design.id == designId )
			{
				this.designData = JSON.parse(JSON.stringify(design));
			}
		
		});
	}


	setProject( projectId )
	{
		this.projectList.forEach( (project) =>{

			if ( project.id == projectId )
			{
				this.projectData = JSON.parse(JSON.stringify(project));
				if ( project.designId != this.designData.id ) { this.setDesign( project.designId ) }

				let maxVersion=0;
				if ( !this.versionData )
				{

						this.versionList.forEach((version)=>{
							if ( ( version.dateCreated > maxVersion ) && 
								 ( version.projectId == projectId ) )
							{
								this.setVersion( version.id );
								maxVersion = version.dateCreated;
							}
						});
				}else{
				
					if ( this.versionData.projectId != this.projectData.id )
					{
						this.versionList.forEach((version)=>{
							if ( ( version.dateCreated > maxVersion ) && 
								 ( version.projectId == projectId ) )
							{
								this.setVersion( version.id );
								maxVersion = version.dateCreated;
							}
						});
					}
				}
			}
		
		});
	}


	setVersion( versionId )
	{
		this.versionList.forEach( (version) =>{

			if ( version.id == versionId )
			{
				this.versionData = JSON.parse(JSON.stringify(version));

				if ( this.versionData.projectId != this.projectData.id )
				{
					this.setProject( version.projectId );
				}
			}
		
		});
	}






	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO initialize and load the model and the menu
	//
	// -----------------------------------------------------------------------------------------------------


	/*
	*
	*	Initialize new model load
	*
	*/
	initializeAll() {

		this.initializeMenu();
		this.initializeModel();
	}




	/*
	*
	*	Load a new model
	*
	*/
	loadModel( modelId ) {

		console.log('In the load model function with an ID of '+modelId);

		// Wipe the div so that the shapediver can reset
		document.getElementById('modelDiv').innerHTML = ''
		


		this.setDesign( modelId );
		this.versionData = <makVersion>JSON.parse(JSON.stringify(this.VersionsService.blankVersion()));
		this.versionList = [];
		this.versionList.push(this.versionData);
		this.initializeAll();

		// Load model from shapediver and initialize model and menu
		/*
		this.designData = this.FirebaseService.getDocById( 'designs', this.designId ).then(response=> {
			this.designData=response.data();
			this.initializeAll();
		});
		*/

	}






	/*
	*
	* Called once when the app loads, this sets the menus
	*
	*/
	initializeMenu() {

		console.log('Initializing the menu for type : '+this.studioType);

		console.log('The parameter menus are ... ');
		console.log(this.designData.parameterMenus);

		// Add and remove the windows for the project menu and cost
		if ( this.studioType == 'design' )
		{
			this.designData.parameterMenus.unshift(this.DesignStudioService.getDesignMenu());
		
		}else if ( this.studioType == 'project' )
		{
			this.designData.parameterMenus.unshift(this.DesignStudioService.getProjectMenu());			
			this.designData.parameterMenus.push(this.DesignStudioService.getSignoffMenu( ));

		}else if ( this.studioType == 'studio' )
		{
			this.designData.parameterMenus.unshift(this.DesignStudioService.getStudioMenu());			
		}


		// Set the menus for cost and signoff and get the menu locations
		this.designData.parameterMenus.push(this.DesignStudioService.getCostMenu( this.studioType ));



		// Get and place image URLs for any image selection items
		for (var c=0; c<this.designData.parameterMenus.length; c++)
		{
			for (var d=0; d<this.designData.parameterMenus[c]['parameters'].length; d++)
			{

				if ( this.designData.parameterMenus[c]['parameters'][d]['images'] === undefined )
				{
					this.designData.parameterMenus[c]['parameters'][d]['images'] = [];
				}
				for (var e=0; e<this.designData.parameterMenus[c]['parameters'][d]['images'].length; e++)
				{

					const ref = this.afStorage.ref(this.designData.parameterMenus[c]['parameters'][d]['images'][e]['path']);
					this.designData['parameterMenus'][c]['parameters'][d]['images'][e]['imageUrl'] = ref.getDownloadURL();
				}
			}
		}


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

		console.log('The version data is ');
		console.log(this.versionData);


		// Wait a few seconds and then place the data from the call into the model
		setTimeout( () => { 

			let paramChanges = [];
			let isChanged = false;

			// Pull the values from the shape diver ticket
			this.shapeData = this.shapediverApi.parameters.get();

			// Set the version data
			this.setVersionData( this.versionList[this.versionList.length-1] );


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


							// if there is a parameter for which there is no value in this version set one
							if ( this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] === undefined  )
							{
								this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] = element.value;
							}

							// Set the design data
							this.designData.parameterMenus[a]['parameters'][b]['value'] = this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']];

						
							// If the parameter from shapediver has a different value than the one
							// for this version, prep it to be shipped to update design
							if ( this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] != element.value  )
							{
								paramChanges.push({'name':element.name, 'value' : this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']]});
								isChanged = true;
							}


						}

						// Handle the case where this is an uploaded image
						if ( ( this.studioType == "project" ) &&
							 ( element['type'] == 'File' ) && 
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


						// Handle the case for the flowers / blob 
						if ( ( this.designData.parameterMenus[a]['parameters'][b]['type'] == "blob" ) &&
							 ( this.designData.parameterMenus[a]['parameters'][b]['shapediver'] == element.name) )
						{
							console.log('The element '+element.name+' is a blob and the data is ...');
							console.log(JSON.parse(element.value));

						}


					}
				}


			});

			this.calcPrice();	
			this.setDragDrop();	


			if ( this.studioType == "project" )
			{
				this.saveVersion( this.versionData );
				if ( isChanged )
				{
					console.log('Updating parameters from initialize data ...');
					this.updateMultipleParameters( paramChanges );					
				}
			}

			console.log('The design data is ...');
			console.log(this.designData);

			console.log('The param changes are ...');
			console.log(paramChanges);


			if ( this.studioType == "studio" )
			{
				localStorage.setItem('makDesign', JSON.stringify(this.designData));
				localStorage.setItem('makProject', JSON.stringify(this.projectData));
				localStorage.setItem('makVersion', JSON.stringify(this.versionData));
			}


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
		console.log('Updating the parameter '+parameters.name+' - '+parameters.id+' with the value '+parameters.value);
		console.log(parameters);

		// Send the update to shapediver so that the model is updated
		if ( parameters['id'] !== undefined )
		{
			this.shapediverApi.parameters.updateAsync({id: parameters.id, value: parameters.value });
		}else{
			this.shapediverApi.parameters.updateAsync({name: parameters.name, value: parameters.value });			
		}


		// Update the price
		this.calcPrice()


		// Set the data in the version
		this.versionData.values[parameters.name] = parameters.value;


		// Update the version data
		if ( this.studioType == 'project' ){ this.saveVersion( this.versionData ); }



		// If the user is simply designing in the studio, save that design to 
		// local memory so that it will reload when they return.
		if ( this.studioType == 'studio' )
		{

			// First, remove the cost and design options from the parameter menu
			let tempData = JSON.parse(JSON.stringify(this.designData));
			for (let a=tempData.parameterMenus.length-1; a>=0; a--)
			{
				if ( ( tempData.parameterMenus[a].name=="makStudio" ) || 
					 ( tempData.parameterMenus[a].name=="cost" ))
				{
					tempData.parameterMenus.splice(a, 1);
				}
			}

			localStorage.setItem('makDesign', JSON.stringify(tempData));
			localStorage.setItem('makProject', JSON.stringify(this.projectData));
			localStorage.setItem('makVersion', JSON.stringify(this.versionData));
		}

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
		//this.shapediverApi.parameters.updateAsync( parameters );
		for (var a=0; a<parameters.length; a++)
		{
			this.shapediverApi.parameters.updateAsync( parameters[a] );
		}
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
		var path = '/studio/logo/'+this.versionData.id+'-'+text+'.'+imageType;			

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
		console.log('Saving version '+versionData.id);

		this.VersionsService.updateVersion( versionData );
		this.SnackBar.open('Version changes saved','', {duration: 4000});

		/*
		this.FirebaseService.updateDocDataUsingId('versions', versionData.uid, versionData )
		.then((snapshot) => {
			this.SnackBar.open('Version changes saved','', {duration: 4000});
		})
		.catch((err) => {
		  console.log('Error updating version', err);
		});
		*/

	}



	/*
	*
	* When a new version is to be created
	*
	*/
	createNewVersion( ) 
	{
		console.log('Creating new version ');
		this.VersionsService.createVersion( '', this.projectData, this.versionData, this.designData )
	}





	/*
	*
	* When a version is selected
	*
	*/
	setVersionData( thisVersion ) 
	{
		thisVersion = JSON.parse(JSON.stringify(thisVersion))
		console.log('setting version to '+thisVersion.version);

		let paramChanges=[];
		let isChanged=false;

		// The initial call to this function has no defined versionData
		if ( this.versionData === undefined){
			this.versionData = JSON.parse(JSON.stringify(thisVersion));
		}

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
						
						//console.log('Comparing '+this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] +' to '+thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']]);
						/*
						if ( this.versionData['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']] != 
							 thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']]  )
						{
							paramChanges.push({'name':element.name, 'value' : thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']]});
							isChanged = true;
						}
						*/
							paramChanges.push({'name':element.name, 'value' : parseFloat(thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']])});
						
					}
				}
			}
		});

		// If any items in this version are different from the original
		// design, update all of those parameters
		console.log('Updating parameters from version data ...');
		console.log(paramChanges);
		this.updateMultipleParameters( paramChanges );			

		// Set the version data
		this.versionData = JSON.parse(JSON.stringify(thisVersion));

		// Set the price
		this.calcPrice();

		// If this is a latest version, it can be changed
		// If not, it cannot be changed
		if ( thisVersion.version == this.versionList.length )
		{
			this.editableVersion = true;
		}else
		{
			this.editableVersion = false;
		}

	}



	/*
	*
	* Calculate the price of a version
	*
	*/
	calcPrice( ) 
	{
		this.versionData.price = this.DesignStudioService.setPrice(this.designData, this.versionData);
		this.designData.price = this.DesignStudioService.setPrice(this.designData, this.versionData);
	}









	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTION TO SET THE DRAG AND DROP FOR THE CURRENT MODEL
	//
	// -----------------------------------------------------------------------------------------------------

	setDragDrop( )
	{

		if ( this.designData.id == "1pbM0lb5hcHureiiX239" )
		{

			var flowersID;
			var panelsScenePath;
			var menuNum = 0;
			var paramNum = 0; 

			for ( var a=1; a<this.designData.parameterMenus.length-1; a++ )
			{
				for ( var b=0; b<this.designData.parameterMenus[a]['parameters'].length; b++ )
				{
					if ( this.designData.parameterMenus[a]['parameters'][b]['type'] == 'blob' )
					{
						this.flowersJSON = JSON.parse(this.designData.parameterMenus[a]['parameters'][b]['value']);
						menuNum=a;
						paramNum=b;
						console.log('Setting the this.flowersJSON to ...');
						console.log(this.flowersJSON);
					}
				}
			}

			//define effects for selectable, hoverable and draggable flowers
			var hoverSelectDragEffect = {
				active: {
					name: 'colorHighlight',
					options: {
						color: [0, 255, 0]
					}
				}
			};

			//flowers in the scene should be hoverable and draggable
			var flowersGroup = {
				id: "flowers_group",
				draggable: true,
				dragEffect: hoverSelectDragEffect,
				hoverable: true,
				hoverEffect: hoverSelectDragEffect,
				selectable: false,
				selectionEffect: hoverSelectDragEffect
			};


			//add interaction group to the scene
			this.shapediverApi.scene.updateInteractionGroups([flowersGroup]);

			//get 3D assets
			var assets = this.shapediverApi.scene.get(null, "CommPlugin_1").data;
			if ( assets === undefined ){ assets = []; }


			//look for flowers and panels assets
			for (var i = 0; i < assets.length; ++i) 
			{
				if (assets[i].material != undefined) 
				{
					if (assets[i].name == "Flowers") 
					{
						flowersID = assets[i].id;
					
					}else if (assets[i].name == "Panels") 
					{
						panelsScenePath = assets[i].scenePath;
					}
				}
			}

			//update flowers 3D asset to make it draggable and hoverable
			this.shapediverApi.scene.updatePersistentAsync({
				id: flowersID,
				interactionGroup: flowersGroup.id,
				interactionMode: "sub",
				dragPlaneNormal: { x: 0, y: 1, z: 0 }
			}, 'CommPlugin_1');


			//add event listener to detect flower dragging
			this.shapediverApi.scene.addEventListener(this.shapediverApi.scene.EVENTTYPE.DRAG_END, (res) => {

				var draggedScenePath = res.scenePath.split(".");

				//check if the dragged element is a flower
				if (draggedScenePath[1] == flowersID) {
					var draggedFlower = draggedScenePath[2].split("_")[1];


					// Mark the selected flower as the current one and update the data
					window['currentFlowerIndex'] = draggedFlower;


					if ( typeof( this.flowersJSON ) == "string")
					{
						this.flowersJSON = JSON.parse(this.flowersJSON);
					}

					//store flower original location
					var originalLoc = this.flowersJSON.flowers[draggedFlower].position;


					//update flower location
					this.flowersJSON.flowers[draggedFlower].position = [res.dragPosAbs.x, res.dragPosAbs.z];


					console.log('Updating the flowers with ...');
					console.log(this.flowersJSON);

					this.shapediverApi.parameters.updateAsync({ 'name': 'flowersJSON', 'value': JSON.stringify(this.flowersJSON) }).then(() => {
						//check if there are any collisions with the new flower location
						var checkFlower = this.shapediverApi.scene.getData({ name: "checkFlowers" }).data[0].data[draggedFlower];
						if (checkFlower.collision) {
							alert("Collision Detected");
							this.flowersJSON.flowers[draggedFlower].position = originalLoc;
							this.shapediverApi.parameters.updateAsync({ 'name': "flowersJSON", 'value': JSON.stringify(this.flowersJSON) });
						}
					});
				}
			});


			//add event listener to detect flower selection
			this.shapediverApi.scene.addEventListener(this.shapediverApi.scene.EVENTTYPE.SELECT_ON, (res) => {
				var selectedScenePath = res.scenePath.split(".");

				//check if the dragged element is a flower
				if (selectedScenePath[1] == flowersID) {
				}
			});


			if ( typeof( this.flowersJSON ) == "string")
			{
				this.flowersJSON = JSON.parse(this.flowersJSON);
			}

			this.flowerFlag = true;
			//activate random flowers
			//this.shapediverApi.parameters.updateAsync({ name: "Random Flowers", value: true }).then(function () {
			//	this.flowersJSON = this.shapediverApi.scene.getData({ name: "randomthis.FlowersJSON" }).data[0].data;
			//	this.shapediverApi.parameters.updateAsync([{ name: "Random Flowers", value: false }, { name: "this.flowersJSON", value: JSON.stringify(this.flowersJSON) }]);
			//});




		

		}else if ( this.designData.id == "eLHfWkL4GA2LFeuoVQkx" )
		{



			console.log('In set drag and drop');
			var panelsScenePath;

			var logoID;

			//define effects for selectable, hoverable and draggable logo
			var hoverSelectDragEffect = {
				active: {
					name: 'colorHighlight',
					options: {
						color: [0, 255, 0]
					}
				}
			};

			// Logo should be hoverable and draggable
			var logo = {
				id: "MakLogo",
				draggable: true,
				dragEffect: hoverSelectDragEffect,
				hoverable: true,
				hoverEffect: hoverSelectDragEffect,
				selectable: false,
				selectionEffect: hoverSelectDragEffect
			};

			//add interaction group to the scene
			this.shapediverApi.scene.updateInteractionGroups([logo]);

			console.log('The output from the scene are ..');
			console.log(this.shapediverApi.scene.updateInteractionGroups([logo]));


			//get 3D assets
			var assets = this.shapediverApi.scene.get(null, "CommPlugin_1").data;

			//look for flowers and panels assets
			if ( assets !== undefined )
			{
				for (var i = 0; i < assets.length; ++i) 
				{
					if (assets[i].material != undefined) 
					{
						if (assets[i].name == "LogoAndText") 
						{
							logoID = assets[i].id;
						
						}else if (assets[i].name == "Panels") 
						{
							panelsScenePath = assets[i].scenePath;
						}
					}
				}
			}


			//update logo to make it draggable and hoverable
			this.shapediverApi.scene.updatePersistentAsync({
				id: logoID,
				interactionGroup: logo.id,
				interactionMode: "sub",
				dragPlaneNormal: { x: 0, y: 1, z: 0 }
			}, 'CommPlugin_1');


			//add event listener to detect logo dragging
			this.shapediverApi.scene.addEventListener(this.shapediverApi.scene.EVENTTYPE.DRAG_END, function (res) {

				// Set the variable values to the dragged values
				var draggedScenePath = res.scenePath.split(".");

				if ( this.designType == 'design' )
				{
					for (var a=0; a<this.designData.parameterMenus.length; a++)
					{
						for (var b=0; b<this.designData.parameterMenus[a]['parameters'].length; b++)
						{

							if ( this.designData.parameterMenus[a]['parameters'][b]['shapediver'] === 'Logo X Location' )
							{
								this.designData.parameterMenus[a]['parameters'][b]['value'] = res.dragPosAbs.x;
							}

							if ( this.designData.parameterMenus[a]['parameters'][b]['shapediver'] === 'Logo Z Location' )
							{
								this.designData.parameterMenus[a]['parameters'][b]['value'] = res.dragPosAbs.z;
							}

						}

					}

				}

				this.shapediverApi.parameters.updateAsync({ name: "Logo X Location", value: res.dragPosAbs.x})
				this.shapediverApi.parameters.updateAsync({ name: "Logo Z Location", value: res.dragPosAbs.z})

			});


		}
		

	}




}

