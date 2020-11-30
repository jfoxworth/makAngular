
/*
	This is the resolver to get one version from the id given in the url.
*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';


// RxJS Items
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';


import { makVersion } from 'app/main/models/makVersion';



// The mak version entity service
import { makVersionEntityService } from 'app/main/services/entity/makVersion-entity.service';
import { makVersionDataService } from 'app/main/services/entity/makVersion-data.service';


@Injectable()
export class oneVersionResolver implements Resolve<makVersion> {

	constructor(private makVersionDataService 	: makVersionDataService,
				private route					: ActivatedRoute,
		) {

	}



	resolve(route: ActivatedRouteSnapshot,
			state: RouterStateSnapshot): Observable<makVersion> {

		return this.makVersionDataService.getVersionById( this.route.snapshot.paramMap.get('versionId') )

	}

}
