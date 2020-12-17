
/*
	This is the resolver to get one design from the id given in the url.
*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';


// RxJS Items
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';


import { makDesign } from '../models/makDesign';



// The mak design entity service
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { makDesignDataService } from '../services/entity/makDesign-data.service';


@Injectable()
export class oneDesignResolver implements Resolve<makDesign> {

	constructor(private makDesignDataService 	: makDesignDataService,
				private route					: ActivatedRoute,
		) {

	}



	resolve(route: ActivatedRouteSnapshot,
			state: RouterStateSnapshot): Observable<makDesign> {

		return this.makDesignDataService.getDesignById( this.route.snapshot.paramMap.get('designId') )

	}

}
