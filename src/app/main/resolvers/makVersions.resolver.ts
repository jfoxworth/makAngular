
/*
    This is the resolver for the mak version models. The function that it
    calls pulls down all of the versions created by a user.
*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


// RxJS Items
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';



// The mak version entity service
import { makVersionEntityService } from '../services/entity/makVersion-entity.service';


@Injectable()
export class MakVersionsResolver implements Resolve<boolean> {

    constructor(private makVersionEntityService: makVersionEntityService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.makVersionEntityService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                       this.makVersionEntityService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}
