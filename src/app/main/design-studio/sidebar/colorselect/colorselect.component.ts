

// Core items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'mak-colorselect',
  templateUrl: './colorselect.component.html',
  styleUrls: ['./colorselect.component.scss']
})
export class ColorselectComponent implements OnInit {

  @Input('valItem') valItem;
  @Input('editableVersion') editableVersion:boolean;
	@Output() updateParameter = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }




  // Format color to be sent to shapediver
  formatColor( hexCode:string ):string {
    return hexCode.replace('#', '0x')+'AA';
  }


  }
