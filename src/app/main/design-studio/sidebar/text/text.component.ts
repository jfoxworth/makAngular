

// Core items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'mak-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input('valItem') valItem;
  @Input('editableVersion') editableVersion:boolean;
	@Output() updateParameter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
