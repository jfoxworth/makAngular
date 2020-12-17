import { Component, OnInit, Input } from '@angular/core';
import { designSignoff } from '../../models/designSignoffs';
import { makDesign } from '../../models/makDesign';
import { UserData } from '../../models/userData';

@Component({
  selector: 'mak-market-item',
  templateUrl: './market-item.component.html',
  styleUrls: ['./market-item.component.scss', '../marketplace.component.scss']
})
export class MarketItemComponent implements OnInit {

  constructor() { }

  @Input() si:makDesign;
  @Input() signoffs:designSignoff[];
  @Input() images;
  @Input() selectedType:string;
  @Input() userData:UserData

  ngOnInit(): void {
  }

}
