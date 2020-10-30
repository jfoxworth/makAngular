

// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { makDesign } from 'app/main/models/makDesign';



@Component({
  selector: 'mak-design-price',
  templateUrl: './design-price.component.html',
  styleUrls: ['./design-price.component.scss']
})
export class DesignPriceComponent implements OnInit {

	@Input('currentDesign') currentDesign:makDesign;
	@Output() saveDesignChanges = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
