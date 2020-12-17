
// Core items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mak-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input('valItem') valItem;
  @Input('editableVersion') editableVersion:boolean;
	@Output() updateParameter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
