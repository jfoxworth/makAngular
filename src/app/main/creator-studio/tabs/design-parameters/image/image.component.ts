import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-parameter-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() parameter:any;
  @Input() parameterUrls:any[];
  @Input() i;
  @Input() j;
  constructor() { }

  ngOnInit(): void {
  }

}
