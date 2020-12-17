
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makDesign } from '../../../models/makDesign';

// Services
import { DesignsService } from '../../../services/designs.service';

@Component({
  selector: 'mak-design-list',
  templateUrl: './design-list.component.html',
  styleUrls: ['./design-list.component.scss']
})
export class DesignListComponent implements OnInit {


	@Input('makDesigns') makDesigns:makDesign[];
	@Input('currentDesign') currentDesign:makDesign;
	@Input('currentId') currentId:string;
	@Output() setCurrent = new EventEmitter();
	@Output() displayMessage = new EventEmitter();


  constructor( private DesignsService : DesignsService) { }

  ngOnInit(): void {
  }

  // Create
	newDesign( ): void
	{
    this.DesignsService.createDesign();
    this.displayMessage.emit({message:'New Design'});
	}


}

