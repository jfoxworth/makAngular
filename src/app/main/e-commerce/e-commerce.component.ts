import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceProductsService } from 'app/main/e-commerce/products/products.service';
import { takeUntil } from 'rxjs/internal/operators';


@Component({
    selector     : 'products',
    templateUrl  : './e-commerce.component.html',
    styleUrls    : ['./e-commerce.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EcommerceComponent implements OnInit
{

    productsData : any;
    columnsToDisplayMeas = ['name', 'value'];
    currentProject : any;
    currentVersion : any = {'id':''}; 



    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _ecommerceProductsService: EcommerceProductsService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this._ecommerceProductsService.onProductsChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {
            this.productsData = response;

            console.log('The project data is ...');
            console.log(this.productsData);

        });

    }


    /**
     * When a version is selected
     */
    onVersionSelected(): void
    {
        this.currentProject.versions.forEach((thisVer, index) => {
            if (thisVer.id == this.currentProject.currentVersionId){ this.currentVersion=thisVer; }
        });

    }

}

