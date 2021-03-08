import { Component, OnInit, Input } from '@angular/core';

// Models
import { makDesign } from '../../models/makDesign';

@Component({
  selector: 'mak-dashboard-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() makDesigns:makDesign[];
  @Input() designImages:any[];
  theseImages : any[];

  constructor() {
    this.theseImages=[];
   }

  ngOnInit(): void {

    this.designImages.forEach(im=>{

      this.makDesigns.forEach(des=>{

        if ( im.itemId == des.id )
        {
          this.theseImages[des.id] = im.imageURL;
        }

      })

    });

    console.log(this.theseImages);


  }

}
