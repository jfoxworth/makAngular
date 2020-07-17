import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatButtonModule } from '@angular/material/button';

// Services
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MarketplaceService } from 'app/main/services/marketplace.service';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Observable } from 'rxjs';


@Component({
  selector: 'store-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class StoreProductComponent implements OnInit {

	public id: string;
	public currentItem:any;
	public storeItem:any;
	dataFlag : boolean = false;
	projectList : any;
	userData : any;


	constructor(private route: ActivatedRoute,
				private FirebaseService : FirebaseService,
				private afStorage : AngularFireStorage,
				private MarketplaceService : MarketplaceService ) {}

	ngOnInit(): void {

		this.userData = JSON.parse(localStorage.getItem('user'));

		// Get the ID of the product being viewed
		this.id = this.route.snapshot.paramMap.get('itemId');


			
		// Get the design data
		this.FirebaseService.getDocById( 'designs', this.id )
			.then((snapshot) => {
				this.storeItem = snapshot.data();
				//console.log(snapshot.data());
				this.formatData();
				this.dataFlag=true;
			})
			.catch((err) => {
			  console.log('Error getting documents', err);
		});
	


		// Get the projects that this user has with this design
		if ( ( this.userData !== null ) && ( this.userData !== undefined ) )
		{
			this.projectList = this.FirebaseService.getCollectionTwoParams('projects', 'creatorId', this.userData.uid, 'designId', this.id);
		}else
		{
			this.projectList = new Observable();
		}


	}



  	/*
  	*
  	*	This function formats the image data necessary
  	*
  	*/
	formatData(){

		this.storeItem['imageUrls'] = [];
		for (var a=0; a<this.storeItem.marketplace.images.length; a++)
		{
			const ref = this.afStorage.ref(this.storeItem.marketplace.images[a]['path']);
			this.storeItem['imageUrls'].push(ref.getDownloadURL());

			if (this.storeItem.marketplace.images[a]['mainImage'])
			{
				this.storeItem['background'] = ref.getDownloadURL();
			}
		}


	}







  	/*
  	*
  	*	This function formats the image data necessary
  	*
  	*/
	addProject( designObj ){

		this.MarketplaceService.addProject( designObj );


	}




}
