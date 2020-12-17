import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { makDesign } from '../../../models/makDesign';
import { DesignsService } from '../../../services/designs.service';

@Component({
  selector: 'mak-design-data',
  templateUrl: './design-data.component.html',
  styleUrls: ['./design-data.component.scss']
})
export class DesignDataComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
	@Output() updateDesign = new EventEmitter();


  constructor( private DesignsService : DesignsService ) { }

  ngOnInit(): void {
  }



}


