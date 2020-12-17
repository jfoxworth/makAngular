
/*
    This is the resolver for the mak projects models. The function
    that it calls pulls all of the projects for a user.
*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


// RxJS Items
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';



// The mak projects entity service
import { designSignoffEntityService } from '../services/entity/designSignoff-entity.service';


@Injectable()
export class MakDesignSignoffsResolver implements Resolve<boolean> {

    constructor(private designSignoffEntityService: designSignoffEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.designSignoffEntityService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                       this.designSignoffEntityService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}
