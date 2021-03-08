import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';
import { DesignsService } from '../../../../services/designs.service';
import { CreatorStudioService } from '../../../../services/creator-studio.service';


@Component({
  selector: 'mak-design-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
	@Output() updateDesign = new EventEmitter();


  designType 			: any;

  constructor( private DesignsService : DesignsService,
               private CreatorStudioService : CreatorStudioService ) { }


  ngOnInit(): void {

    this.designType		= this.CreatorStudioService.getDesignTypes();

  }


	// Update
	saveCatChange( event )
	{
    console.log( event.value );
		this.updateDesign.emit( {...this.currentDesign, 'category':event.value} );
  }



}
