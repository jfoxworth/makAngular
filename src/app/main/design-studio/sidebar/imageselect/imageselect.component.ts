

// Core items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'mak-imageselect',
  templateUrl: './imageselect.component.html',
  styleUrls: ['./imageselect.component.scss']
})
export class ImageselectComponent implements OnInit {

  @Input('valItem') valItem;
  @Input('editableVersion') editableVersion:boolean;
	@Output() updateParameter = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

}
