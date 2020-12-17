
// Core items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mak-blobitems',
  templateUrl: './blobitems.component.html',
  styleUrls: ['./blobitems.component.scss']
})
export class BlobitemsComponent implements OnInit {

	blobSelectIndex : number = 0;
  @Input('valItem') valItem;
  @Input('editableVersion') editableVersion:boolean;
	@Input('flowersJSON') flowersJSON:any;
	@Output() updateParameter = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  // Add a new item to the blob
  addNewItemToBlob():void
  {
    this.flowersJSON['flowers'].splice({'size':'', 'position':[], 'rotation': ''});
  }



    // Delete an item from the blob
  deleteItemFromBlob( index:number ):void
  {
    this.flowersJSON['flowers'].splice( index, 1 );
  }

  // Stringify an object
  stringify( ots:object ):string {
    return JSON.stringify( ots )
  }

    

}
