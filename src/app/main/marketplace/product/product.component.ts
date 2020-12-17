// Common Angular Items
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// RXJS Items
import { map, mergeMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Models
import { makDesign } from '../../models/makDesign';
import { makProject } from '../../models/makProject';
import { makVersion } from '../../models/makVersion';
import { signoffReq } from '../../models/signoffReq';

// NGRX Items
import { Store } from "@ngrx/store";
import { DesignState } from '../../store/reducers';

// Services
import { makDesignEntityService } from '../../services/entity/makDesign-entity.service';
import { signoffReqEntityService } from '../../services/entity/signoffReq-entity.service';
import { makProjectEntityService } from '../../services/entity/makProject-entity.service';
import { MarketplaceService } from '../../services/marketplace.service';


@Component({
  selector: 'mak-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	public id 							: string;
	public marketplaceItem 	: makDesign;
	dataFlag 								: boolean = false;
	projectDataFlag 				: boolean = false;
	projectList 						: makProject[];
	signoffList 						: signoffReq[];
	userData 								: any;
	makDesign$ 							: Observable<makDesign>;
	signoffReqs$ 						: Observable<signoffReq[]>;
	makProjects$ 						: Observable<makProject[]>;
	signoffs 								: string[];
	images 									: any[];

  constructor(private route 		          	: ActivatedRoute,
              private MarketplaceService    : MarketplaceService,
              private DesignEntityService 	: makDesignEntityService,
              private ProjectEntityService 	: makProjectEntityService,
              private SignoffEntityService 	: signoffReqEntityService,
              private designStore 					: Store<DesignState>)
  {}




  ngOnInit(): void {

		this.userData = JSON.parse(localStorage.getItem('user'));


		// Get the ID of the product being viewed
		this.id = this.route.snapshot.paramMap.get('itemId');


		// The observable for the signoff reqs from the store
		this.signoffReqs$ = this.SignoffEntityService.entities$
			.pipe(
				tap((signoffReqs) => {
					this.signoffs = [];
					for (let a=0; a<signoffReqs.length; a++)
					{
						this.signoffs.push(signoffReqs[a]['designId']);
					}
				})
			)
		this.signoffReqs$.subscribe();




		// The observable for the design data from the store
		this.makDesign$ = this.DesignEntityService.entities$
		.pipe(
			mergeMap(makDesigns => makDesigns.filter(makDesign => makDesign.id == this.id))
		);



		// The observable for the projects for this design
		this.makProjects$ = this.ProjectEntityService.entities$
		.pipe(
			map(makProjects => makProjects.filter(makProject => makProject.designId == this.id))
		);


		// Listen to the images observable
		this.designStore.subscribe(state => {

      this.images = this.MarketplaceService.getProductImages(this.id, state.designs.designs);

		});



  }


}
