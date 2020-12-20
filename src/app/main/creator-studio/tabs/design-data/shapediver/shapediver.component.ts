import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Form Items
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NameCheckValidators } from 'src/app/main/Common/Validators/namecheck.validators';

// Models
import { makDesign } from 'src/app/main/models/makDesign';


@Component({
  selector: 'mak-design-sd',
  templateUrl: './shapediver.component.html',
  styleUrls: ['./shapediver.component.scss']
})
export class ShapediverComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
  @Output() updateDesign = new EventEmitter();
  
  shapeform : FormGroup;

  get shape(){
    return this.shapeform.get('shape');
  }


  constructor( ) { }

  ngOnInit(): void {

    this.shapeform = new FormGroup({
      'shape' : new FormControl(this.currentDesign.shapediverTicket, [Validators.minLength(200),
                                                                      NameCheckValidators.cannotContainSpecialChars ]),
    });
  
  }

  // Update
	saveShapeChange( event:FocusEvent )
	{
    this.shapeform.controls.shape.status=="VALID" ? 
		this.updateDesign.emit( { ...this.currentDesign, 'shapediverTicket' : (<HTMLInputElement>event.target).value } ):'';
	}


}
