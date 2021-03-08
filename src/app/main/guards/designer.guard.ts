

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../store/reducers';
import { checkDesignerStatus, pullUserData } from '../store/selectors/auth.selectors';


@Injectable()
export class DesignerGuard implements CanActivate {

  constructor(
    private store : Store<AppState>,
    private router : Router){}
  

  canActivate( route : ActivatedRouteSnapshot,
               state : RouterStateSnapshot) 
               : Observable<boolean> {


                return this.store
                  .pipe(
                    select(checkDesignerStatus),
                    tap(isDesigner => {
                    })
                  )


              }




}