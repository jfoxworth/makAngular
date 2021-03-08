import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { makDesign } from 'src/app/main/models/makDesign';


@Component({
  selector: 'mak-design-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {


  @Input('currentDesign') currentDesign:makDesign;
  @Output() updateDesign = new EventEmitter();
  


  constructor( ) { }

  ngOnInit(): void {


  }

  // Update
	saveStatusChange( event )
	{
    console.log(event);
		this.updateDesign.emit( {...this.currentDesign, 'status':event.value } );
	}


}
