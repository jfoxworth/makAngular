import { Component, OnInit, Input } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';

@Component({
  selector: 'mak-product-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss', '../product.component.scss']
})
export class DescriptionComponent implements OnInit {

  @Input() makDesign:makDesign;

  constructor() { }


  ngOnInit(): void {
  }

}
