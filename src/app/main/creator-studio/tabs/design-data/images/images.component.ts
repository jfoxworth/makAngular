import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makDesign } from 'src/app/main/models/makDesign';

// Services
import { DesignsService } from '../../../../services/designs.service';
import { CreatorStudioService } from '../../../../services/creator-studio.service';

// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';

// RXJS
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'mak-design-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
	@Output() updateDesign = new EventEmitter();

  carouselUrls : Array<any> = [];


  constructor( private DesignsService       : DesignsService,
               private afStorage 				    : AngularFireStorage, )
  {
  }

  ngOnInit(): void {
  }



	// Update
	updateImages( images )
	{
    this.updateDesign.emit( {...this.currentDesign,
                            marketplace: {...this.currentDesign.marketplace, images:images } }  );
  }


  	/*
  	*
  	*	This function simply sets the main image
  	*
  	*/
	setMainImage(thisIndex){
    let images=[]
		for (var a=0; a<this.currentDesign.marketplace.images.length; a++)
		{
      images.push(this.currentDesign.marketplace.images);
      if ( a == thisIndex )
			{
				images[a]['mainImage']=true;
			}else
			{
				images[a]['mainImage']=false;
			}
    }
    this.updateImages( images );
  }



	/*
	*
	* When the background image is uploaded
	*
	*/
	onBGUpload(event) {

    let newImages=[];
		// Grab the background image
		const file = event.target.files[0];
		console.log('The target is ...');
		console.log(event.target.files);

		var imageType = file.type.replace('image/','');


		let text = "";
		let possible = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for (let i = 0; i < 6; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
  		}
		var path = '/marketplace/carousel/'+this.currentDesign.id+'-'+text+'.'+imageType;


		// Get URL
		const ref = this.afStorage.ref(path);

		// Upload file and subscribe to results
		const task = this.afStorage.upload(path, event.target.files[0]);
		task.snapshotChanges().pipe(
        	finalize(() => this.carouselUrls.push(ref.getDownloadURL()) )
    	 )
    	.subscribe()



		newImages.push({ 'path': path, 'mainImage':false });
    this.updateImages( {...this.currentDesign,
                        marketplace:{ ...this.currentDesign.marketplace, images: newImages } } );

  	}




}
