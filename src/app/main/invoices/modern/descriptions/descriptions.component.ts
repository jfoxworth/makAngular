import { Component, OnInit, Input } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';
import { makProject } from 'src/app/main/models/makProject';
import { makVersion } from 'src/app/main/models/makVersion';


@Component({
  selector: 'mak-invoice-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['../modern.component.scss']
})
export class DescriptionsComponent implements OnInit {

  @Input() designData:makDesign;
  @Input() projectData:makProject;
  @Input() versionData:makVersion;

  constructor() { }

  ngOnInit(): void {
  }

}
