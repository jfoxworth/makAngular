
// Core items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mak-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  @Input('valItem') valItem;
  @Input('editableVersion') editableVersion:boolean;
	@Output() uploadFile = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

}
