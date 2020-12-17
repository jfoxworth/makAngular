

// Core items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'mak-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input('valItem') valItem;
  @Input('editableVersion') editableVersion:boolean;
	@Output() updateParameter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
