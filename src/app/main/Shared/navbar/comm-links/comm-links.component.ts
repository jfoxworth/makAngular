import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'mak-comm-links',
  templateUrl: './comm-links.component.html',
  styleUrls: ['./comm-links.component.scss', '../../../commercial/comm-styles.scss']
})
export class CommLinksComponent implements OnInit {


  @Input('route') route:string;


  ourWorkArray  : string[];
  productsArray : string[];

  constructor() { }

  ngOnInit(): void {

    this.ourWorkArray  = [ '/ourWork', '/jacobwhite', '/arm', '/ramada', '/daikin', '/houstonsfirst' ];
    this.productsArray = [ '/products', '/walls', '/seating', '/desks', '/islands' ];
  }


  ngOnChanges(changes:SimpleChanges) {
    this.route=changes.route.currentValue;
    console.log(this.route);
  }


}
