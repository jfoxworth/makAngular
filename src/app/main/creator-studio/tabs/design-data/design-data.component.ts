import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { makDesign } from 'app/main/models/makDesign';

@Component({
  selector: 'mak-design-data',
  templateUrl: './design-data.component.html',
  styleUrls: ['./design-data.component.scss']
})
export class DesignDataComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
  
	@Output() saveDesignChanges = new EventEmitter();
	@Output() setCompany = new EventEmitter();
	@Output() onBGUpload = new EventEmitter();
	@Output() setMainImage = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

}


