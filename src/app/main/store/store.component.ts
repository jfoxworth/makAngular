import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';

import { DesignService } from 'app/main/services/design-service.service';

import { FirebaseService } from 'app/main/services/firebase.service';

import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

	storeItems : any[];
	storeList : any[];
	currentItem : any;
	selectedType : string = "All";
	designTypes=this.DesignService.getDesignTypes();
	mobile : boolean = false;
	userData : any;

	constructor(private DesignService : DesignService,
				private FirebaseService : FirebaseService,
				private SnackBar: MatSnackBar,
				private afStorage : AngularFireStorage 
		) { 

        // Get the user data
        this.userData = JSON.parse(localStorage.getItem('user'));
	}

	

	ngOnInit(): void {

		if ( window.screen.width < 960 )
		{
			this.mobile = true;
		}

		this.designTypes.unshift("All");


		// Pull all docs where a status is active
		this.FirebaseService.getDocsByParam( 'designs', 'status', 1 )
			.subscribe(result => {
				var tempArray = [];
				var docData;
				result.forEach((doc) => {
					docData=doc.data();
					docData.uid=doc.id;
					console.log(doc.id, '=>', doc.data());
					tempArray.push(docData);
				});
				this.storeList = tempArray;
				console.log(this.storeList);
				this.formatData();
		});




		this.storeItems = [
			{
	            'id'      : '154588a0864d2881124',
	            'title'   : 'Fossil Wall',
	            'slug'    : 'fossil-wall',
	            'category': 'Wall',
	            'length'  : 60,
	            'updated' : 'Nov 01, 2017',
	            'date_created' : 'July 5, 2020',
	            'initialPrice' : 3150,
	            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/Products+-+Feature+Wall/flower_solid_surface_feature_wall.jpg',
	            'description' : 'lorem ipsum free text here',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
	            ]
			},
			{
	            'id'      : 'fm3oif93hfiuf3u3iihg',
	            'title'   : 'Planter Bench',
	            'slug'    : 'planter-bench',
	            'category': 'Seating',
	            'length'  : 60,
	            'updated' : 'Nov 01, 2017',
	            'date_created' : 'July 5, 2020',
	            'initialPrice' : 3150,
	            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/Products+-+Lobby+Seating/parametric_lobby_bench_seating.jpg',
	            'description' : 'The MAK Studio planter bench adds a stylish seating element to any lobby or reception area. Customers can adjust the depth of the bench, the length of each side, the length of the twist area, and the depths of the planters areas on each side.',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/ProductImages/Screen+Shot+2020-04-15+at+5.28.57+PM.png",
	            	"https://makstudio.s3.us-east-2.amazonaws.com/Products+-+Lobby+Seating/parametric_lobby_bench_seating.jpg",
	            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
	            ]
			},
			{
	            'id'      : 'fmowhf983hfi34b3f3f',
	            'title'   : 'Flower Wall',
	            'slug'    : 'flower-wall',
	            'category': 'Wall',
	            'length'  : 60,
	            'updated' : 'Nov 01, 2017',
	            'date_created' : 'July 5, 2020',
	            'initialPrice' : 3150,
	            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/makStudioFlowerWall.jpg',
	            'description' : 'lorem ipsum free text here',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
	            ]
			},
			{
	            'id'      : 'nwofy78guhjef3rf',
	            'title'   : 'Breakroom Islands',
	            'slug'    : 'breakroom-islands',
	            'category': 'Island',
	            'length'  : 60,
	            'updated' : 'Nov 01, 2017',
	            'date_created' : 'July 5, 2020',
	            'initialPrice' : 3150,
	            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/Products+-+Breakroom+Islands/breakroom_island.jpg',
	            'description' : 'lorem ipsum free text here',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
	            ]
			},
			{
	            'id'      : ' bhjf7t89jionfwgufw',
	            'title'   : 'Reception Desk',
	            'slug'    : 'reception-desk',
	            'category': 'Desk',
	            'length'  : 60,
	            'updated' : 'Nov 01, 2017',
	            'date_created' : 'July 5, 2020',
	            'initialPrice' : 3150,
	            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/Products+-+Reception+Desk/lobby_reception_desk_nova_chem.jpg',
	            'description' : 'lorem ipsum free text here',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
	            ]
			},
			{
	            'id'      : 'fnieurfy8734g3hbfg',
	            'title'   : 'Backlit Wall',
	            'slug'    : 'backlit-wall',
	            'category': 'Wall',
	            'length'  : 60,
	            'updated' : 'Nov 01, 2017',
	            'date_created' : 'July 5, 2020',
	            'initialPrice' : 3150,
	            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/Homepage/back_lit_feature_wall_jacob.jpg',
	            'description' : 'lorem ipsum free text here',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
	            ]
			},
			{
	            'id'      : 'fergerfhrguigopkf3f',
	            'title'   : 'Slat Wall',
	            'slug'    : 'slat-wall',
	            'category': 'Wall',
	            'length'  : 60,
	            'updated' : 'Nov 01, 2017',
	            'date_created' : 'July 5, 2020',
	            'initialPrice' : 3150,
	            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/OfficeWall9.jpg',
	            'description' : 'lorem ipsum free text here',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
	            ]
			},
			{
	            'id'      : 'kjhdtrsrertiyhiohgbu7t',
	            'title'   : 'Faceted Wall',
	            'slug'    : 'faceted-wall',
	            'category': 'Wall',
	            'length'  : 60,
	            'updated' : 'Nov 01, 2017',
	            'date_created' : 'July 5, 2020',
	            'initialPrice' : 3150,
	            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/facetedWallDemo.jpg',
	            'description' : 'lorem ipsum free text here',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
	            ]
			},
			{
	            'id'      : 'niugihfui3fho3ghoe',
	            'title'   : 'Planter Wall',
	            'slug'    : 'planter-wall',
	            'category': 'Wall',
	            'length'  : 60,
	            'updated' : 'Nov 01, 2017',
	            'date_created' : 'July 5, 2020',
	            'initialPrice' : 3150,
	            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/flowerWallDemo.jpg',
	            'description' : 'lorem ipsum free text here',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
	            ]
			}
		];



	}




  	/*
  	*
  	*	This function formats the image data necessary
  	*
  	*/
	formatData(){

		for (var a=0; a<this.storeList.length; a++)
		{

			this.storeList[a]['imageUrls'] = [];
			for (var b=0; b<this.storeList[a].marketplace.images.length; b++)
			{

				const ref = this.afStorage.ref(this.storeList[a].marketplace.images[b]['path']);
				this.storeList[a]['imageUrls'].push(ref.getDownloadURL());

				if (this.storeList[a].marketplace.images[b]['mainImage'])
				{
					this.storeList[a]['background'] = ref.getDownloadURL();
				}
			}

		}

	}




}
