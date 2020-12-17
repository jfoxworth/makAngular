import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';
import { DesignsService } from '../../../../services/designs.service';

@Component({
  selector: 'mak-design-signoffsOnOff',
  templateUrl: './signoffs.component.html',
  styleUrls: ['./signoffs.component.scss']
})
export class SignoffsComponent implements OnInit {


  @Input('currentDesign') currentDesign:makDesign;
	@Output() updateDesign = new EventEmitter();


  constructor( private DesignsService : DesignsService ) { }

  ngOnInit(): void {
  }


	// Update
	saveSignoffChange( event )
	{
		this.updateDesign.emit( {...this.currentDesign, 'signoffRequired':event.target.value} );
  }

}
