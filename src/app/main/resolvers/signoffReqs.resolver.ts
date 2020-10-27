
/*
    This is the resolver for the sign off reqs models. The function that it
    calls pulls all of the signoffs for a user.
*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


// RxJS Items
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';



// The mak designs entity service
import { signoffReqEntityService } from 'app/main/services/entity/signoffReq-entity.service';


@Injectable()
export class SignoffReqsResolver implements Resolve<boolean> {

    constructor(private signoffReqEntityService: signoffReqEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.signoffReqEntityService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                       this.signoffReqEntityService.getAll( );
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}
