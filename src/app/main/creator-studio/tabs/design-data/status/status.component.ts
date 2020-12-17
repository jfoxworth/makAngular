import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';
import { DesignsService } from '../../../../services/designs.service';


@Component({
  selector: 'mak-design-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {


  @Input('currentDesign') currentDesign:makDesign;
	@Output() updateDesign = new EventEmitter();


  constructor( private DesignsService:DesignsService) { }

  ngOnInit(): void {
  }

  // Update
	saveStatusChange( event )
	{
		this.updateDesign.emit( {...this.currentDesign, 'status':event.target.value } );
	}


}