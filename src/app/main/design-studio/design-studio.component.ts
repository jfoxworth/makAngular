import { Component, OnDestroy, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { DesignStudioService } from 'app/main/design-studio/design-studio.service';



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
    searchInput: any;


    // Data for Design menu
    projectMenu = {
					'location' : 0,
					'name' : 'makDesigns',
					'label' : 'Available Designs',
					'icon' : 'filter_vintage',
					'items' : [
						{
							'location' : 0,
							'type' : 'makButtonSet',
							'buttons' : [
								{
									'order' : 0,
									'icon' : 'assets/images/mak-icons/MAKICONS-04.png',
									'tooltip' : 'Planter Wall',
									'name' : 'planterWall'
								},
								{
									'order' : 1,
									'icon' : 'assets/images/mak-icons/MAKICONS-05.png',
									'tooltip' : 'Planter Bench',
									'name' : 'planterBench'
								},
								{
									'order' : 2,
									'icon' : 'assets/images/mak-icons/MAKICONS-06.png',
									'tooltip' : 'Faceted Wall',
									'name' : 'facetedWall'
								},
								{
									'order' : 3,
									'icon' : 'assets/images/mak-icons/MAKICONS-07.png',
									'tooltip' : 'Slat Wall',
									'name' : 'slatWall'
								},
								{
									'order' : 4,
									'icon' : 'assets/images/mak-icons/MAKICONS-08.png',
									'tooltip' : 'Backlit Wall',
									'name' : 'backlitWall'
								},
								{
									'order' : 5,
									'icon' : 'assets/images/mak-icons/MAKICONS-09.png',
									'tooltip' : 'Custom Desk',
									'name' : 'customDesk'
								},
								{
									'order' : 6,
									'icon' : 'assets/images/mak-icons/MAKICONS-10.png',
									'tooltip' : 'Flower Wall',
									'name' : 'flowerWall'
								},
								{
									'order' : 7,
									'icon' : 'assets/images/mak-icons/MAKICONS-11.png',
									'tooltip' : 'Fossil Wall',
									'name' : 'fossilWall'
								}
							]
						},
					]
				}

    costMenu = {
					'location' : 0,
					'name' : 'cost',
					'label' : 'Quote',
					'icon' : 'attach_money',
					'items' : [
						{
							'location' : 0,
							'type' : 'makCost',
							'buttons' : [
							]
						}
					]
				}


   // Private
    private _unsubscribeAll: Subject<any>;


	constructor(private _studio: DesignStudioService) { 
        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();


	    this._studio.onDesignChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {
            this.designData = response;



	        // Prepend and append the cost and menu data
	        this.designData.menu.unshift(this.projectMenu);
			this.designData.menu.push(this.costMenu);


	        // Add the array to hide/show the side menus
	        this.designData.menuShow = [];
			this.designData.menu.forEach((value, index) => {
				this.designData.menuShow[index] =  false;
			});


        });

		console.log('Declaring variables');

		console.log('The design data is ...');
		console.log(this.designData);

	}





	ngOnInit() {

	    this._studio.onDesignChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {
            this.designData = response;



        });

		console.log('Declaring variables');

		console.log('The design data is ...');
		console.log(this.designData);



    }





	


	ngAfterViewInit() {

		// provide global access to the ShapeDiver Viewer API returned by the constructor
		
		this.window = window;
		
/*
		this.window.api = new SDVApp.ParametricViewer({
		ticket: 'b377b948d7f72cee5db1184551e10c1e9f8a34cae0323283b7f5f8831cedc2e26986531436453d00bbce7556061713170f148b9d879fc7e6b2454fce26e030c1c8fb9782aeaaa1fa73ed74ce6059e6daba4a3b682e769ebfe82ee516dfc6b2a0fe3fc30c2fab53476e8f1f82c895f1781fa1746ebd15-b63fe0ed951441432130ea48fe327cf7',
		container : document.getElementById('modelDiv'),
		modelViewUrl: 'eu-central-1', // or 'us-east-1' or address of your own ShapeDiver model view server
		});
*/		
	}




}

