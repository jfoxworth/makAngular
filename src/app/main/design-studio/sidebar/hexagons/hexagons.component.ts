
// Core items
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

// Models
import { makDesign } from '../../../models/makDesign';

// Services
import { DesignStudioService } from '../../../services/design-studio.service';


@Component({
  selector: 'mak-design-hexagons',
  templateUrl: './hexagons.component.html',
  styleUrls: ['../sidebar.component.scss']
})
export class HexagonsComponent implements OnInit {

	menuLocations 	: number[][] = this.DesignStudioService.getMenuLocations();

  @Input('designData') designData:makDesign;
	@Output() menuClick = new EventEmitter();

  constructor( private DesignStudioService 	: DesignStudioService ) { }

  ngOnInit(): void {
  }

}
