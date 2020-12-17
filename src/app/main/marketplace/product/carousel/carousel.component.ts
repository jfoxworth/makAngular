import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  @Input() images;

  ngOnInit(): void {
  }

}
