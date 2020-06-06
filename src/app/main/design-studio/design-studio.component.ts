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
				private activeRoute: ActivatedRoute,
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
				this.versionData = this.blankVersion();
				this.initializeAll();

			});


		// WHen a user is navigating using the icon menu to a preset design
		}else if ( ( this.route.snapshot.url[1].toString() != 'design' ) &&
				   ( this.route.snapshot.url[1].toString() != 'project') )
		{

			this.studioType = 'studio';

			this.designId = this.route.snapshot.url[1].toString();

			this.designData = this.FirebaseService.getDocById( 'designs', this.designId ).then(response=> {
				this.designData=response.data();
				this.versionData = this.blankVersion();
				this.initializeAll();

			});


		// WHen a user is looking at a design that is likely not live
		}else if ( this.route.snapshot.url[1].toString() == 'design' )
		{
			this.studioType = 'design';
			this.designId = this.route.snapshot.paramMap.get('designId');

			this.designData = this.FirebaseService.getDocById( 'designs', this.designId ).then(response=> {
				this.designData=response.data();
				this.versionData = this.blankVersion();
				this.initializeAll();

			});



		// If the viewer is looking at a project - the nominal case of a user working on a project
		}else if ( this.route.snapshot.url[1].toString() == 'project' )
		{

			this.studioType = 'project';
			this.projectId = this.route.snapshot.paramMap.get('projectId');

			this.projectData = this.FirebaseService.getDocById( 'projects', this.projectId ).then(response=> {
				
				this.projectData = response.data();

				this.designData = this.FirebaseService.getDocById('designs',this.projectData.designId ).then(response=>{

					this.designData = response.data();


					this.FirebaseService.getDocsByParam( 'versions', 'projectId', this.projectData.uid )
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
							console.log(this.versionList);
							this.versionData = this.versionList[this.versionList.length-1];
							console.log('The version data is ...');
							console.log(this.versionData);
							this.initializeAll();
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
				this.versionData = this.blankVersion();
				this.initializeAll();
			});

		}

	}









	/*
	*
	*	Create a blank version
	*
	*/
	blankVersion() {

		let tempVer = { 'values' : {},
						'parameterMenus' : [] };

		for ( var a=1; a<this.designData.parameterMenus.length-1; a++ )
		{
			tempVer['parameterMenus'][a] = { 'parameters':[] };

			for ( var b=0; b<this.designData.parameterMenus[a]['parameters'].length; b++ )
			{
				tempVer['parameterMenus'][a]['parameters'][b] = {  };
			}
		}

		return tempVer
	}



	/*
	*
	*	Initialize new model load
	*
	*/
	initializeAll() {
		this.dataFlag=true;
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
		
		// Set the design ID
		this.designId = modelId;


		// Load model from shapediver and initialize model and menu
		this.designData = this.FirebaseService.getDocById( 'designs', this.designId ).then(response=> {
			this.designData=response.data();
			this.initializeAll();
		});
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

			this.calcPrice();	
			this.setDragDrop();	


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


		// Update the price
		this.calcPrice()


		// Set the data in the version
		this.versionData.values[parameters.name] = parameters.value;


		// Update the version data
		if ( this.studioType == 'project' ){ this.saveVersion( this.versionData ); }

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
		this.designData.price = this.DesignStudioService.setPrice(this.designData, this.versionData);
	}









	/*--------------------------------------------------------*

		This function sets the items to be dragged and
		dropped in the current model.

	/*-------------------------------------------------------*/
	setDragDrop( )
	{

/*

		if ( this.designData.uid == "1pbM0lb5hcHureiiX239" )
		{

			var flowersID;
			var panelsScenePath;
			var flowersJSON = makModel.build_data.componentValues.flowersJSON;

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
			this.shapediverApi.scene.addEventListener(this.shapediverApi.scene.EVENTTYPE.DRAG_END, function (res) {

				var draggedScenePath = res.scenePath.split(".");

				//check if the dragged element is a flower
				if (draggedScenePath[1] == flowersID) {
					var draggedFlower = draggedScenePath[2].split("_")[1];


					// Mark the selected flower as the current one and update the data
					window['currentFlowerIndex'] = draggedFlower;
					$('#flowerXLoc').val( makModel['build_data']['componentValues']['flowersJSON']['flowers'][currentFlowerIndex]['position'][0] );
					$('#flowerYLoc').val( makModel['build_data']['componentValues']['flowersJSON']['flowers'][currentFlowerIndex]['position'][1] );
					$('#flowerSize').val( makModel['build_data']['componentValues']['flowersJSON']['flowers'][currentFlowerIndex]['size'] );
					$('#flowerRot').val( makModel['build_data']['componentValues']['flowersJSON']['flowers'][currentFlowerIndex]['rotation'] );
					amplitude.getInstance().logEvent('Dragged Flower');


					//store flower original location
					var originalLoc = flowersJSON.flowers[draggedFlower].position;

					//update flower location
					flowersJSON.flowers[draggedFlower].position = [res.dragPosAbs.x, res.dragPosAbs.z];
					this.shapediverApi.parameters.updateAsync({ name: "flowersJSON", value: JSON.stringify(flowersJSON) }).then(function () {
						//check if there are any collisions with the new flower location
						var checkFlower = this.shapediverApi.scene.getData({ name: "checkFlowers" }).data[0].data[draggedFlower];
						if (checkFlower.collision) {
							alert("Collision Detected");
							flowersJSON.flowers[draggedFlower].position = originalLoc;
							this.shapediverApi.parameters.updateAsync({ name: "flowersJSON", value: JSON.stringify(flowersJSON) });
						}
					});
				}
			});


			//add event listener to detect flower selection
			this.shapediverApi.scene.addEventListener(this.shapediverApi.scene.EVENTTYPE.SELECT_ON, function (res) {
				var selectedScenePath = res.scenePath.split(".");

				//check if the dragged element is a flower
				if (selectedScenePath[1] == flowersID) {
				}
			});


			//activate random flowers
			//this.shapediverApi.parameters.updateAsync({ name: "Random Flowers", value: true }).then(function () {
			//	flowersJSON = this.shapediverApi.scene.getData({ name: "randomFlowersJSON" }).data[0].data;
			//	this.shapediverApi.parameters.updateAsync([{ name: "Random Flowers", value: false }, { name: "flowersJSON", value: JSON.stringify(flowersJSON) }]);
			//});




		

		}else if ( this.designData.uid == "eLHfWkL4GA2LFeuoVQkx" )
		{

*/

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

			console.log('The assets are ...');
			console.log(assets);


			//look for flowers and panels assets
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


			//update logo to make it draggable and hoverable
			this.shapediverApi.scene.updatePersistentAsync({
				id: logoID,
				interactionGroup: logo.id,
				interactionMode: "sub",
				dragPlaneNormal: { x: 0, y: 1, z: 0 }
			}, 'CommPlugin_1');


			//add event listener to detect logo dragging
			this.shapediverApi.scene.addEventListener(this.shapediverApi.scene.EVENTTYPE.DRAG_END, function (res) {

				console.log('The res is ...');
				console.log(res);

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

