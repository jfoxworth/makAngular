import { Component, OnInit, Input } from '@angular/core';
import { makDesign } from '../../models/makDesign';

@Component({
  selector: 'mak-exploded-view',
  templateUrl: './exploded.component.html',
  styleUrls: ['./exploded.component.scss']
})
export class ExplodedComponent implements OnInit {

	activeModel  : makDesign;

  constructor() { }

  @Input('currentDesign') currentDesign:makDesign;


  ngOnInit(): void {
    this.activeModel = JSON.parse(JSON.stringify(this.currentDesign));
  }


}
