import { Component, OnInit, Input } from '@angular/core';
import { makVersion } from 'src/app/main/models/makVersion';


@Component({
  selector: 'mak-cost-list',
  templateUrl: './cost-list.component.html',
  styleUrls: ['../modern.component.scss']
})
export class CostListComponent implements OnInit {

  @Input() measurements;
  @Input() versionData:makVersion;
  constructor() { }

  ngOnInit(): void {
  }

}
