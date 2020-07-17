import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EcommerceService implements Resolve<any>
{
    products: any[];
    onProductsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
    )
    {
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
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): void
    {
/*
        console.log('In the get products');
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/e-commerce-products')
                .subscribe((response: any) => {
                    this.products = response;
                    this.onProductsChanged.next(this.products);
                    resolve(response);
                }, reject);
        });
*/
    }







    /**
    * 
    *  Return the product stages
    *
    **/
    getProductStages() :string[] {
        return ['Design', 'Deposit', 'Approval', 'Fabrication', 'Balance', 'Delivery', 'Feedback']
    }




    /**
    * 
    *  Return initial product settings
    *
    **/
    getInitialStageStatus() :boolean[] {
        return [true, false, false, false, false, false, false]
    }



    /**
    * 
    *  Return initial selected status
    *
    **/
    getInitialSelectedStatus() :boolean[] {
        return [true, false, false, false, false, false, false]
    }



    /**
    * 
    *  Return initial selected status
    *
    **/
    getStageTexts() :object[] {
        return [ { 'done' : 'While in the design phase, you can create as many versions as desired. Once you are happy with a version, you can look at a quote and then submit that version for purchase. When that is complete, a deposit can be made. After the deposit, Mak Studio will contact you for approval.',
                    'notdone' : 'NA'},
                 { 'done' : 'Your deposit has been received.',
                   'notdone' : 'Once you are happy with a design version, you can look at the quote from either this page or the design studio. From there, you can make a deposit to move forward.'  } ]
    }



}
