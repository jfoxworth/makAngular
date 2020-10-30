
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { makDesign } from 'app/main/models/makDesign';



@Component({
  selector: 'mak-design-marketplace',
  templateUrl: './design-marketplace.component.html',
  styleUrls: ['./design-marketplace.component.scss']
})
export class DesignMarketplaceComponent implements OnInit {

	@Input('currentDesign') currentDesign:makDesign;


  constructor() { }

  ngOnInit(): void {
  }

}
