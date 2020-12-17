
// Core items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'mak-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input('valItem') valItem;
  @Input('editableVersion') editableVersion:boolean;
	@Output() updateParameter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
