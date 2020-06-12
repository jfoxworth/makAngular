import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';


// Services
import { InvoiceService } from 'app/main/services/invoice.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';

@Component({
    selector     : 'invoice-modern',
    templateUrl  : './modern.component.html',
    styleUrls    : ['./modern.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InvoiceModernComponent implements OnInit, OnDestroy
{
    invoice: any;

    // Variables
    versionId : string;
    designId : string;
    viewType : string = 'version';
    dataFlag : number = 0;
    versionData : any;
    designData : any;
    projectData : any;
    measurements : any = [];

    /**
     * Constructor
     *
     * @param {InvoiceService} _invoiceService
     */
    constructor(
        private _invoiceService: InvoiceService,
        private route: ActivatedRoute,
        private AuthService : AuthService,
        private FirebaseService : FirebaseService
    )
    {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the version id. If there is no version ID,
        // get the design id
        this.versionId = this.route.snapshot.paramMap.get('versionId');
        console.log('Version ID is '+this.versionId);
        if ( this.versionId === 'design' )
        {
            this.designId = this.route.snapshot.paramMap.get('designId');
            this.viewType = 'design';
        }


        // Grab the version Data 
        this.versionData = this.FirebaseService.getDocById( 'versions', this.versionId ).then(response=> {
            this.versionData=response.data();
            console.log('The version data is ...');
            console.log(this.versionData);
    
            this.designData = this.FirebaseService.getDocById( 'designs', this.versionData.designId ).then(response=> {
                this.designData=response.data();
                this.dataFlag=this.dataFlag+1;
                console.log('The design data is ...');
                console.log(this.designData);
            });

            this.projectData = this.FirebaseService.getDocById( 'projects', this.versionData.projectId ).then(response=> {
                this.projectData=response.data();
                this.dataFlag=this.dataFlag+1;
                console.log('The project data is ...');
                console.log(this.projectData);
            });


            // Format the value data
            this.formatValues();



            // calculate the costs
            this.calculateCosts();

        });

    }



    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }




    /**
    *
    * This is a simple function to calculate tax and total
    *
    **/
    calculateCosts(){

    	this.versionData.tax = Math.round(this.versionData.price*0.0825);
    	this.versionData.totalCost = Math.round(this.versionData.price+this.versionData.tax);
    	this.versionData.deposit = Math.round(this.versionData.totalCost * 0.25);
    }







    /**
    *
    * The values object is pushed into an array so that it can be displayed
    *
    **/
    formatValues(){

    	for (const property in this.versionData.values) {

    		this.measurements.push({ 'name' : property, 'value' : this.versionData['values'][property]});
  			console.log(`${property}: ${this.versionData['values'][property]}`);
		}

    }





}
