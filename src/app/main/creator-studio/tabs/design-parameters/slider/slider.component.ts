import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-parameter-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() parameter:any;

  constructor( ) { }

  ngOnInit(): void {
  }

}
