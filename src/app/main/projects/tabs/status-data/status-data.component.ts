

// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makProject } from '../../../models/makProject';



@Component({
  selector: 'mak-status-data',
  templateUrl: './status-data.component.html',
  styleUrls: ['./status-data.component.scss']
})
export class StatusDataComponent implements OnInit {

	@Input('currentProject') currentProject:makProject;
  @Input('projectStages') projectStages:makProject;
  @Input('selectedStatus') selectedStatus:boolean[];
  @Input('projectStatus') projectStatus:makProject;
  @Input('stageTexts') stageTexts:any[];


  constructor() { }

  ngOnInit(): void {
  }



	/**
	 *  	Set the selected Item
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
