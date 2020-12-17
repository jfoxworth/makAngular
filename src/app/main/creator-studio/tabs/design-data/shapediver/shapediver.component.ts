import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';
import { DesignsService } from '../../../../services/designs.service';

@Component({
  selector: 'mak-design-sd',
  templateUrl: './shapediver.component.html',
  styleUrls: ['./shapediver.component.scss']
})
export class ShapediverComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
	@Output() updateDesign = new EventEmitter();


  constructor( private DesignsService:DesignsService) { }

  ngOnInit(): void {
  }

  // Update
	saveShapeChange( event )
	{
		this.updateDesign.emit( { ...this.currentDesign, 'shapediverTicket' : event.target.value } );
	}


}
