
/*
	This is the resolver to get one design from the id given in the url.
*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';


// RxJS Items
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';


import { makProject } from '../models/makProject';



// The mak design entity service
import { makProjectEntityService } from '../services/entity/makProject-entity.service';
import { makProjectDataService } from '../services/entity/makProject-data.service';


@Injectable()
export class oneProjectResolver implements Resolve<makProject> {

	constructor(private makProjectDataService 	: makProjectDataService,
				private route					: ActivatedRoute,
		) {

	}



	resolve(route: ActivatedRouteSnapshot,
			state: RouterStateSnapshot): Observable<makProject> {

		return this.makProjectDataService.getProjectById( this.route.snapshot.paramMap.get('projectId') )

	}

}
