import { Component, OnInit, Input } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';
import { makProject } from 'src/app/main/models/makProject';
import { UserData } from 'src/app/main/models/userData';

@Component({
  selector: 'mak-product-display-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainProductComponent implements OnInit {

  @Input() makDesign:makDesign;
  @Input() makProjects:makProject[];
  @Input() userData:UserData;
  @Input() images:any[];

  constructor() { }

  ngOnInit(): void {
  }

}
