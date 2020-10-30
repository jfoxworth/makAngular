
/*
    This is the resolver for the mak projects models. The function
    that it calls pulls all of the projects for a user.
*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


// RxJS Items
import { filter, first, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';



// The mak projects entity service
import { makProjectEntityService } from 'app/main/services/entity/makProject-entity.service';


@Injectable()
export class MakProjectsResolver implements Resolve<boolean> {

    constructor(private makProjectEntityService: makProjectEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.makProjectEntityService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                    this.makProjectEntityService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}
