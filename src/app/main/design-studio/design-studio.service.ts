import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DesignStudioService implements Resolve<any>
{

 
    design: any;
    onDesignChanged: BehaviorSubject<any>;





    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onDesignChanged = new BehaviorSubject({});

    }








    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getDesign()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Design
     */
    getDesign(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            console.log('In the get design function');
            this._httpClient.get('api/design')
                .subscribe((response: any) => {
                    this.design = response;
                    this.onDesignChanged.next(this.design);
                    resolve(this.design);
                }, reject);
        });
    }
}
