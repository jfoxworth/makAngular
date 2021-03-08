
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makDesign } from '../../../models/makDesign';

// Drag Drop Items
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'mak-explode-parameters',
  templateUrl: './explode-parameters.component.html',
  styleUrls: ['./explode-parameters.component.scss']
})
export class ExplodeParametersComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
  @Output() updateDesign = new EventEmitter();
  
  
  explodeParam : any;

  constructor( ) 
  { }

  ngOnInit(): void {

    this.explodeParam = { 'type'     : 'button',
                          'side'     : 'left',
                          'title'    : '',
                          'subtitle' : '',
                          'active'   : '',
                          'affIm'    : false,
                          'options'  : [],
                          'imageOptions' : [] };

  }


  addOption()
  {
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp.push(this.explodeParam);
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }


  deleteSelection( index:number )
  {
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[index].splice(index,1);
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }


  
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    console.log(event.previousContainer.element.nativeElement.classList.contains('rightlist'));
    console.log(event.previousContainer.element.nativeElement.classList.contains('leftlist'));


    if ( event.container.element.nativeElement.classList.contains('leftlist') ) {
      let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
      temp[event.currentIndex]['side']='right';
      console.log(temp);
      this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );  
    }


    if ( event.container.element.nativeElement.classList.contains('rightlist') ) {
      let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
      temp[event.currentIndex]['side']='left';
      console.log(temp);
      this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );  
    }


  }


}
