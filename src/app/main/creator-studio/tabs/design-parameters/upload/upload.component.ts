import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-parameter-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Input() parameter:any;
  constructor() { }

  ngOnInit(): void {
  }

}
