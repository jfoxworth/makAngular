

/*

	This is the controller for the primary component of the app - the
	design studio.

*/

// Common Angular Items
import { Component, OnDestroy, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

// Angular Material Items
import { MatSnackBar } from '@angular/material/snack-bar';

// RXJS
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// NGRX Items
import { Store } from "@ngrx/store";
import { AuthState } from '../../main/store/reducers';

// Services
import { DesignStudioService } from '../services/design-studio.service';
import { VersionsService } from '../services/versions.service';
import { UserService } from '../services/user.service';
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { makVersionEntityService } from '../services/entity/makVersion-entity.service';
import { makProjectEntityService } from '../services/entity/makProject-entity.service';
import { signoffReqEntityService } from '../services/entity/signoffReq-entity.service';

// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';

// Models
import { makDesign } from '../models/makDesign';
import { makProject } from '../models/makProject';
import { makVersion } from '../models/makVersion';
import { signoffReq } from '../models/signoffReq';
import { designSignoff } from '../models/designSignoffs';
import { UserData } from '../models/userData';


@Component({
	selector: 'mak-design-studio',
	templateUrl: './design-studio.component.html',
	styleUrls: ['./design-studio.component.scss']
})
export class DesignStudioComponent  {

	require : any;
	window : any;
	SDVApp : any;

	shapediver:any;

	makDesigns$ 		    : Observable<makDesign[]>;
	makProjects$ 		    : Observable<makProject[]>;
	makVersions$ 		    : Observable<makVersion[]>;
	makSignoffReqs$ 	  : Observable<signoffReq[]>;
	makDesignSignoffs$ 	: Observable<designSignoff[]>;

	designList 			    : makDesign[];
	projectList 		    : makProject[];
	versionList 		    : makVersion[];
	signoffList 		    : designSignoff[];
	signoffReqList 		  : signoffReq[];

	designData 			    : makDesign=<makDesign>{};
	projectData 		    : makProject;
	versionData 		    : makVersion;
	signoffData 		    : designSignoff;

	studioType 			    : string;
	shapediverApi 		  : any;
	shapeData 			    : any;
	flowersJSON 		    : any;
	flowerFlag 			    : boolean = false;
	editableVersion 	  : boolean = true;
	userData 			      : UserData;
	paramName 			    : any;

  shapediverReturn$ : Observable<any>;
  shapedataReturn$ : Observable<any>;
	private _unsubscribeAll: Subject<any>;
	
	// This is because shapediver doesn't have a promise or observable
	public shapeListen : Subject<any> = new Subject();
	shapeListen$ = this.shapeListen.asObservable();
	public shapeDataSub = this.shapeListen$.subscribe(data=>{
		console.log('Got shape data, calling function');
		this.formatShapeData(data)});


	public modelListen : Subject<any> = new Subject();
	modelListen$ = this.modelListen.asObservable();
	public modelSub = this.modelListen$.subscribe(data=>{
		console.log('Got model data, getting shape data');
		this.shapeListen.next(this.shapediverApi.parameters.get());
	});



	constructor(	private DesignStudioService 		: DesignStudioService,
                private VersionsService 		  	: VersionsService,
                private UserService             : UserService,
                private afStorage 			    		: AngularFireStorage,
                private route 						      : ActivatedRoute,
                private DesignEntityService 		: makDesignEntityService,
                private SignoffReqEntityService : signoffReqEntityService,
                private ProjectEntityService 		: makProjectEntityService,
                private VersionEntityService 		: makVersionEntityService,
                private SnackBar                : MatSnackBar,
                private store                   : Store<AuthState>,
                @Inject(DOCUMENT) private document 	: Document)
	{
    this._unsubscribeAll = new Subject();
  }





	ngOnInit() {


    this.subscribeToObservables();

    this.UserService.userObject
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user)=>{ this.userData = <UserData>user; });

    this.studioType = this.DesignStudioService.setStudioType( this.route.snapshot.url[1] ? this.route.snapshot.url[1].toString() : '' );

    this.designData = this.DesignStudioService.setDesignData( this.studioType,
                                                              this.designList,
                                                              this.projectList,
                                                              JSON.parse(localStorage.getItem('makDesign')),
                                                              this.route.snapshot.url[1] ? this.route.snapshot.url[1].toString() : '',
                                                              this.route.snapshot.paramMap.get('designId') ? this.route.snapshot.paramMap.get('designId') : '')



    this.projectData = this.DesignStudioService.setProjectData( this.studioType,
                                                                this.projectList,
                                                                localStorage.getItem('makProject') != 'undefined' ? JSON.parse(localStorage.getItem('makProject')) : '',
                                                                this.route.snapshot.paramMap.get('projectId') ? this.route.snapshot.paramMap.get('projectId') : '')



    this.versionData = this.DesignStudioService.setVersionData( this.studioType,
                                                                this.versionList,
                                                                localStorage.getItem('makVersion') != 'undefined' ? JSON.parse(localStorage.getItem('makVersion')) : '',
                                                                this.route.snapshot.paramMap.get('versionId') ? this.route.snapshot.paramMap.get('versionId') : '')
    this.versionList.push(this.versionData);

    this.initializeAll();


	}






	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------


  subscribeToObservables(){

		this.makDesigns$ = this.DesignEntityService.entities$
		this.makDesigns$.subscribe( (makDesigns)=>{
			this.designList = makDesigns;
		});

		this.makProjects$ = this.ProjectEntityService.entities$
		this.makProjects$.subscribe( (makProjects)=>{
			this.projectList = makProjects;
		});

		this.makVersions$ = this.VersionEntityService.entities$
		this.makVersions$.subscribe( (makVersions) =>{
			this.versionList = makVersions;
		});

		this.makSignoffReqs$ = this.SignoffReqEntityService.entities$
		this.makSignoffReqs$ .subscribe( (makSignoffReqs) =>{
			this.signoffReqList = makSignoffReqs;
		});
  }

	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO SET THE DESIGN, PROJECT, or VERSION
	//
	// -----------------------------------------------------------------------------------------------------

	setDesign( designId:string, designList:makDesign[] )
	{
		this.designData = <makDesign>JSON.parse(JSON.stringify(designList.find( design => design.id == designId)))
	}


	setProject( projectId )
	{
		this.projectList.forEach( (project) =>{

			if ( project.id == projectId )
			{
				this.projectData = JSON.parse(JSON.stringify(project));
				if ( project.designId != this.designData.id ) { this.setDesign( project.designId, this.designList ) }

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
	loadModel( modelId:string ) {

		console.log('In the load model function with an ID of '+modelId);

		// Wipe the div so that the shapediver can reset
		document.getElementById('modelDiv').innerHTML = ''



		this.setDesign( modelId, this.designList );
		this.versionData = <makVersion>JSON.parse(JSON.stringify(this.VersionsService.blankVersion()));
		this.versionList = [];
		this.versionList.push(this.versionData);
		this.initializeAll();


	}






	/*
	*
	* Called once when the app loads, this sets the menus
	*
	*/
	initializeMenu() {

		if ( this.studioType == 'studio' )
		{

			// First, remove the cost and design options from the parameter menu
			for (let a=this.designData.parameterMenus.length-1; a>=0; a--)
			{
				if ( ( this.designData.parameterMenus[a].name=="makStudio" ) ||
					 ( this.designData.parameterMenus[a].name=="cost" ))
				{
					this.designData.parameterMenus.splice(a, 1);
				}
			}
		}

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
		this.modelListen.next(
			this.shapediverApi = new SDVApp.ParametricViewer({
			ticket: this.designData.shapediverTicket,
			container : document.getElementById('modelDiv'),
			modelViewUrl: 'eu-central-1', // or 'us-east-1' or address of your own ShapeDiver model view server
			})
		)

	}


	formatShapeData(thisData)
	{
		this.shapeData = thisData
		console.log('Formate Shape data called');

		console.log('The version data is ');
		console.log(this.versionData);


		// Wait a few seconds and then place the data from the call into the model

			let paramChanges = [];
			let isChanged = false;

			// Pull the values from the shape diver ticket
//			this.shapeData = this.shapediverApi.parameters.get();
//			this.shapeListen.next('test2');
//			this.shapeListen.next(this.shapediverApi.parameters.get());
			

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

	}








	/*
	*
	* When the user changes a parameter on the template
	* and the shapediver model is updated
	*
	*/
	updateParameter( parameters )
	{

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

	}



	/*
	*
	* When a version is selected
	*
	*/
	setVersionData( thisVersion )
	{
		thisVersion = JSON.parse(JSON.stringify(thisVersion))

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
            paramChanges.push({'name':element.name, 'value' : parseFloat(thisVersion['values'][this.designData.parameterMenus[a]['parameters'][b]['shapediver']])});

					}
				}
			}
		});

		// If any items in this version are different from the original
		// design, update all of those parameters
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
  //    THIS IS KIND OF A MESS, BUT IT COMES DIRECTLY FROM SHAPEDIVER
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

