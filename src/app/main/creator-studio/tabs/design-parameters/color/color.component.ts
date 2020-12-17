import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-parameter-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  @Input() parameter:any;
  constructor() { }

  ngOnInit(): void {
  }

}
