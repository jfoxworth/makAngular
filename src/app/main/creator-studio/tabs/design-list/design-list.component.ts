
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { makDesign } from 'app/main/models/makDesign';


@Component({
  selector: 'mak-design-list',
  templateUrl: './design-list.component.html',
  styleUrls: ['./design-list.component.scss']
})
export class DesignListComponent implements OnInit {


	@Input('makDesigns$') makDesigns$:makDesign[];
	@Input('currentDesign') currentDesign:makDesign;
	@Output() setCurrent = new EventEmitter();
	@Output() newDesign = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

}

