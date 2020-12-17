import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-home-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss', '../../comm-styles.scss']
})
export class SquareComponent implements OnInit {


  @Input('title') title:string;
  @Input('text') text:string;
  @Input('link') link:string;
  @Input('bgimage') bgimage:string;

  constructor() { }

  ngOnInit(): void {
  }

}
