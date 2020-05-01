import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'store-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class StoreProductComponent implements OnInit {

	public id: string;
	public currentItem:any;
	public storeItems:any;


	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {

		this.id = this.route.snapshot.paramMap.get('itemId');

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
	            'description' : 'The MAK Studio signature fossil wall adds class and elegance to any room. Customers can set the height and width of the wall, and set the size and spacing of the fossil elements.',
	            'company' : {
	            	'name' : 'MAK Studio',
	            	'location' : 'Houston, Texas',
	            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
	            },
	            'images' : [
	            	"https://makstudio.s3.us-east-2.amazonaws.com/Products+-+Feature+Wall/flower_solid_surface_feature_wall.jpg",
	            	"https://makstudio.s3.us-east-2.amazonaws.com/ProductImages/Screen+Shot+2020-04-15+at+5.41.27+PM.png",
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





		this.storeItems.forEach((value, index) => {
			if (value.id==this.id)
			{
				this.currentItem =  value;
			}
		});

	}





}
