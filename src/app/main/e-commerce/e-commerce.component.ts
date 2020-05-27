import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';


import { EcommerceProductsService } from 'app/main/services/products.service';
import { FirebaseService } from 'app/main/services/firebase.service';


@Component({
    selector     : 'products',
    templateUrl  : './e-commerce.component.html',
    styleUrls    : ['./e-commerce.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EcommerceComponent implements OnInit
{

    projectList : any;
    columnsToDisplayMeas = ['name', 'value'];
    currentProject : any = {};
    currentVersion : any = {'id':''}; 
    userData : any;


    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _ecommerceProductsService: EcommerceProductsService,
        private FirebaseService : FirebaseService,
        private SnackBar: MatSnackBar
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

        // Scrape the user data
        this.userData = JSON.parse(localStorage.getItem('user'));

        // Get the projects that this user has with this design
        this.projectList = this.FirebaseService.getCollection('projects', 'creatorId', this.userData.uid);

    }


    /**
     * Get versions for a project
     */
    getVersions( projectId ): void
    {
        this.currentProject.versions = this.FirebaseService.getCollection('versions', 'projectId', projectId);
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

