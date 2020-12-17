import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';
import { DesignsService } from '../../../../services/designs.service';

@Component({
  selector: 'mak-design-data-nd',
  templateUrl: './name-description.component.html',
  styleUrls: ['./name-description.component.scss']
})
export class NameDescriptionComponent implements OnInit {


  @Input('currentDesign') currentDesign:makDesign;
	@Output() updateDesign = new EventEmitter();


  constructor( private DesignsService : DesignsService ) { }

  ngOnInit(): void {
  }


	saveNameChange( event )
	{
		this.updateDesign.emit( {...this.currentDesign, 'title':event.target.value} );
  }

	saveDescChange( event )
	{
		this.updateDesign.emit( {...this.currentDesign, 'description':event.target.value} );
  }

}
