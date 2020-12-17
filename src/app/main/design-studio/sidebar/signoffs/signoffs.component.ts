
// Core items
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

// Models
import { designSignoff } from '../../../models/designSignoffs';
import { makDesign } from '../../../models/makDesign';

// Services
import { DesignSignoffsService } from '../../../services/design-signoffs.service';


@Component({
  selector: 'mak-design-signoffs',
  templateUrl: './signoffs.component.html',
  styleUrls: ['./signoffs.component.scss']
})
export class SignoffsComponent implements OnInit {

  signoffStatus:number=0;
  signoffComments:string='';

  @Input('signoffData') signoffData:designSignoff;
  @Input('designData') designData:makDesign;
	@Output() setVersionData = new EventEmitter();

  constructor( private DesignSignoffsService 	: DesignSignoffsService ) { }

  ngOnInit(): void {
  }


  createNewSignoff( ):void
  {
    this.DesignSignoffsService.createDesignSignoff( JSON.parse(localStorage.getItem('user')),
                                                    this.designData.id,
                                                    this.signoffStatus,
                                                    this.signoffComments );

  }

}
