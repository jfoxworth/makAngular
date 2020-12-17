import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'mak-comm-links',
  templateUrl: './comm-links.component.html',
  styleUrls: ['./comm-links.component.scss', '../../../commercial/comm-styles.scss']
})
export class CommLinksComponent implements OnInit {


  @Input('route') route:string;

  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(changes:SimpleChanges) {
    this.route=changes.route.currentValue;
    console.log(this.route);
  }


}
