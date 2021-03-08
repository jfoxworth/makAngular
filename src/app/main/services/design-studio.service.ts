/*

  This is the service for the design studio page. It returns the constants needed for the
  component and handles a lot of items like setting the status, the default data, etc.

*/


import { Injectable } from '@angular/core';

// Models
import { makDesign } from '../models/makDesign';
import { makProject } from '../models/makProject';
import { makVersion } from '../models/makVersion';

// Services
import { VersionsService } from '../services/versions.service';


@Injectable({providedIn: 'root'})
export class DesignStudioService
{

	design: any;


	/**
	 * Constructor
	 *
	 */
	constructor( private VersionsService : VersionsService

  ){}






	/**
	 * Set the studio type of the page
	 *
	*/
  setStudioType( routeString:string ):string
  {
    switch ( routeString )
    {
      case '':
        return 'studio';

      case "design":
        return 'design';

      case "project":
        return 'project';

      default:
        return 'studio';
    }
  }





	/**
	 * Set the initial design data
	 *
	*/
  setDesignData( studioType:string, designList:makDesign[], projectList:makProject[], localDesign, routeString:string, designString:string ):makDesign
  {
    switch ( studioType )
    {
      case 'studio':
        return localDesign ? <makDesign>localDesign : this.setDesign('jBRzSildNc16fQjAmLkh', designList)

      case "design":
        return this.setDesign(designString, designList);

      case "project":
        return this.setDesignFromProject(routeString, designList, projectList);

      default:
        return localDesign ? <makDesign>localDesign : this.setDesign(designString, designList)
    }
  }


  setDesign( designId:string, designList:makDesign[] )
	{
		return <makDesign>JSON.parse(JSON.stringify(designList.find( design => design.id == designId)))
	}

  setDesignFromProject( projectId:string, designList:makDesign[], projectList:makProject[] )
	{
    let thisProject = projectList.find(project => project.id==projectId )
		return <makDesign>JSON.parse(JSON.stringify(designList.find( design => design.id == thisProject.designId)))
	}







	/**
	 * Set the initial project data
	 *
	*/
  setProjectData( studioType:string, projectList:makProject[], localProject, projectString:string ):makProject
  {
    switch ( studioType )
    {
      case 'studio':
        return <makProject>{}

      case "design":
        return <makProject>{}

      case "project":
        return this.setProject(projectString, projectList);

      default:
        return localProject ? <makProject>localProject : <makProject>{}
    }
  }


  setProject( projectId:string, projectList:makProject[] )
	{
		return <makProject>JSON.parse(JSON.stringify(projectList.find( design => design.id == projectId)))
  }






	/**
	 * Set the initial version data
	 *
	*/
  setVersionData( studioType:string, versionList:makVersion[], localVersion, projectString:string ):makVersion
  {
		console.log('In set version data');
		console.log();
    switch ( studioType )
    {
      case 'studio':
				return localVersion ? localVersion :
        			 <makVersion>JSON.parse(JSON.stringify(this.VersionsService.blankVersion()))


      case "design":
        return <makVersion>JSON.parse(JSON.stringify(this.VersionsService.blankVersion()))

      case "project":
        return this.setVersionFromProject(projectString, versionList);

      default:
        return localVersion ? <makVersion>localVersion : <makVersion>{}
    }
  }


  setVersionFromProject( projectId:string, versionList:makVersion[] )
	{
		console.log('The project string and version list is '+projectId);
		console.log(versionList);
		console.log(versionList.filter(ver=>{ return ver.projectId == projectId ? true : false; }))
    return versionList.filter(ver=>{ return ver.projectId == projectId ? true : false; })
          .slice(0)
          .sort((a,b)=>{return a.version-b.version})[0]
	}




















	/**
	 * The locations of the hexagons
	 */
	getMenuLocations(){
		return [
				[60, 8],
				[30, 60],
				[88, 60],
				[60, 112],
				[30, 164],
				[88, 164],
				[59,216],
				[30,220],
			]
	}







	/**
	 * Get Studio Menu
	 */
	getStudioMenu()
	{

		// Data for Studio menu
		return {
				'location' : 0,
				'name' : 'makStudio',
				'label' : 'Available Designs',
				'icon' : 'filter_vintage',
				'parameters' : [
					{
						'location' : 0,
						'type' : 'makButtonSet',
						'buttons' : [
							{
								'order' 	: 0,
								'icon' 		: 'assets/images/mak-icons/MAKICONS-04.png',
								'tooltip' 	: 'Planter Wall',
								'name' 		: 'planterWall',
								'id' 		: ''
							},
							{
								'order' : 1,
								'icon' : 'assets/images/mak-icons/MAKICONS-05.png',
								'tooltip' : 'Planter Bench',
								'name' : 'planterBench',
								'id' 		: 'jBRzSildNc16fQjAmLkh'
							},
							{
								'order' : 2,
								'icon' : 'assets/images/mak-icons/MAKICONS-06.png',
								'tooltip' : 'Faceted Wall',
								'name' : 'facetedWall',
								'id' 		: 'SzBOwe2odgJubMPI5kB7'
							},
							{
								'order' : 3,
								'icon' : 'assets/images/mak-icons/MAKICONS-07.png',
								'tooltip' : 'Slat Wall',
								'name' : 'slatWall',
								'id' 		: 'k3Ah6psRFJs12MJfsmxL'
							},
							{
								'order' : 4,
								'icon' : 'assets/images/mak-icons/MAKICONS-08.png',
								'tooltip' : 'Backlit Wall',
								'name' : 'backlitWall',
								'id' 		: 'eLHfWkL4GA2LFeuoVQkx'
							},
							{
								'order' : 5,
								'icon' : 'assets/images/mak-icons/MAKICONS-09.png',
								'tooltip' : 'Custom Desk',
								'name' : 'customDesk',
								'id' 		: ''
							},
							{
								'order' : 6,
								'icon' : 'assets/images/mak-icons/MAKICONS-10.png',
								'tooltip' : 'Flower Wall',
								'name' : 'flowerWall',
								'id' 		: '1pbM0lb5hcHureiiX239'
							},
							{
								'order' : 7,
								'icon' : 'assets/images/mak-icons/MAKICONS-11.png',
								'tooltip' : 'Fossil Wall',
								'name' : 'fossilWall',
								'id' 		: 'rdTLJhZqGZ1uhLa59vVC'
							}
						]
					},
				]
			}

	}



	/**
	 * Get Project Menu
	 */
	getProjectMenu()
	{
		// Data for Project menu
		return {
				'location' : 0,
				'name' : 'makProjects',
				'label' : 'Previous Versions',
				'icon' : 'list',
				'parameters' : [
					{
						'location' : 0,
						'type' : 'makProjectVersions',
						'text' : 'This will be filled with the list of versions soon.'
					}
				]
		}
	}




	/**
	 * Get Project Menu
	 */
	getDesignMenu()
	{
		// Data for Project menu
		return {
				'location' : 0,
				'name' : 'makDesigns',
				'label' : 'Design Text',
				'icon' : 'apps',
				'parameters' : [
					{
						'location' : 0,
						'type' : 'makText',
						'text' : 'Once a project has been created with this design, a list of all versions that they have created will be available here.'
					}
				]
			}

	}





	/**
	 * Get Cost Menu
	 */
	getCostMenu( designType )
	{


		if ( designType == 'design' )
		{
			return {
				'location' : 0,
				'name' : 'cost',
				'label' : 'Quote',
				'icon' : 'attach_money',
				'parameters' : [
					{
						'location' : 0,
						'type' : 'makCostDesign',
						'buttons' : [
						]
					}
				]
			}
		}

		if ( designType == 'studio' )
		{
			return {
				'location' : 0,
				'name' : 'cost',
				'label' : 'Quote',
				'icon' : 'attach_money',
				'parameters' : [
					{
						'location' : 0,
						'type' : 'makCostStudio',
						'buttons' : [
						]
					}
				]
			}
		}


		if ( designType == 'project' )
		{
			return {
				'location' : 0,
				'name' : 'cost',
				'label' : 'Quote',
				'icon' : 'attach_money',
				'parameters' : [
					{
						'location' : 0,
						'type' : 'makCostProject',
						'buttons' : [
						]
					}
				]
			}
		}


	}







	/**
	 * Get Signoff Menu
	 */
	getSignoffMenu()
	{
		// Data for Project menu
		return {
				'location' : 0,
				'name' : 'makSignoffs',
				'label' : 'Design Signoffs',
				'icon' : 'assignment_turned_in',
				'parameters' : [
					{
						'location' : 0,
						'type' : 'makDesignSignoffs',
						'text' : 'This will be filled with the list of versions soon.'
					}
				]
		}
	}





	/**
	 *
	 * The function calculate the price of a design
	 *
	 */

	setPrice(currentDesign:makDesign, currentVersion:makVersion) {


		if ( ( !currentDesign.priceValid ) || ( currentDesign.priceString=='' ))
		{
			return currentDesign.initialPrice;
		}
		let priceString = '';
		for (let i = 0; i < currentDesign.priceArray.length; i++) {

			if ( currentDesign.priceArray[i].status == 'parameter' )
			{
				priceString = priceString+currentVersion['values'][currentDesign.priceArray[i]['text']];

			}else
			{
				priceString = priceString + currentDesign.priceArray[i].text;
			}
		}

    return Math.round(eval(priceString));


	}





}
