import { Component, OnInit, Input } from '@angular/core';
import { makProject } from 'src/app/main/models/makProject';

@Component({
  selector: 'mak-projects-list',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  @Input() makProjects:makProject[];

  ngOnInit(): void {
  }

}
