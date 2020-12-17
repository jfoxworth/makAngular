
// Core items
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'mak-buttons',
  templateUrl: './mak-buttons.component.html',
  styleUrls: ['./mak-buttons.component.scss']
})
export class MakButtonsComponent implements OnInit {

  @Input('valItem') valItem;
	@Output() loadModel = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
